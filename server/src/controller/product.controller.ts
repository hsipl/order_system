import { NextFunction, Request, Response } from "express";
import { ProductRepository } from "../repository/product.repository";
import { ProductService } from "../services/product.service";
import ErrorHandler from "./error.controller";
import { errorMsg, errorStatusCode } from "../bases/errorTypes";
import { IProductCreateParams, IProductUpdateParams, IProductDeleteParams, IProudctUpdate } from "../interafaces/product.interface";
import { deleteFile } from '../utils/fileUpload';
import { StoreService } from "../services/store.service";
import { TagService } from "../services/tag.service";
import { Tag } from "../entity/tag";

class ProductController {
    public readonly service: ProductService;
    public readonly storeService: StoreService;
    public readonly tagService: TagService;

    constructor(service: ProductService, storeService: StoreService, tagService: TagService) {
        this.service = service;
        this.storeService = storeService;
        this.tagService = tagService;
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        const products = await this.service.getAll();
        res.status(200).json(products);
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        const id: number = parseInt(req.params.id);
        if (!id) {
            return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError));
        }
        try {
            const product = await this.service.getById(id);
            if (!product) {
                return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.DataNotFound));
            }
            res.status(200).json(product);
        } catch (error) {
            console.log("create db error: ", error);
            return next(new ErrorHandler(errorStatusCode.InternalServerError, errorMsg.InternalServerError));
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const image = req.file ? req.file.filename : '';
        let { name, money, category, status, tags, storeId }: IProductCreateParams = req.body;
        if (!name || !money || category === undefined || status === undefined) {
            if (image !== '') await deleteFile(image);
            return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError));
        }
        try {
            const checkforeignKeyExit = await this.storeService.getById(storeId);
            if (!checkforeignKeyExit) {
                return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.StoreIdError));
            }
            let tagsData: Tag[] | undefined;
            if (tags) {
                tagsData = await this.tagService.getByIds(<number[]>tags);
                if (!tagsData) {
                    return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.TagAssociationError));
                }
            }
            tags = tagsData;
            const params = { name, money, image, storeId, category, status, tags };
            const newProduct = await this.service.create(params);
            res.status(200).json(newProduct);
        } catch (error) {
            console.log("create db error: ", error);
            return next(new ErrorHandler(errorStatusCode.InternalServerError, errorMsg.InternalServerError));
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const id: number = parseInt(req.params.id);
        if (!id) {
            return next(new ErrorHandler(errorStatusCode.InternalServerError, errorMsg.InternalServerError));
        }
        const image = req.file ? req.file.filename : '';
        // let { name, storeId, money, category, status, tags }: IProductUpdateParams = req.body;
        // if (!name || !money || status === undefined || status === undefined) {
        //     if (image !== '') await deleteFile(image);
        //     return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError));
        // }
        try {
            // const checkforeignKeyExit = await this.storeService.getById(storeId);
            // if (!checkforeignKeyExit) {
            //     return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.StoreIdError));
            // }
            const product = await this.service.getById(id);
            if (!product) {
                return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.DataNotFound));
            }
            const tagId: number[] = [];
            product?.tags.forEach(t => tagId.push(t.id));
            console.log(tagId)
            product.tags = product.tags.filter(t => {
                return t.id !== tagId[0]
            })
            const newProduct = await this.service.updateRelation(product);
            // const { product }: IProudctUpdate = p;
            // const s = await this.service.softRemove(product)
            res.status(200).json(newProduct);
            // const checkforeignKeyExit = await this.storeService.getById(storeId);
            // if (!checkforeignKeyExit) {
            //     return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.StoreIdError));
            // }
            // let tagsData: Tag[] | undefined;
            // if (tags) {
            //     tagsData = await this.tagService.getByIds(<number[]>tags);
            //     if (!tagsData) {
            //         return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.TagAssociationError));
            //     }
            // }
            // tags = tagsData;
            // const params: IProductUpdateParams = { id, name, money, storeId, image, category, status, tags };
            // console.log(params);
            // const updatedRes = await this.service.update(params);
            // res.status(200).json(updatedRes);
        } catch (error) {
            console.log("create db error: ", error);
            // if (image !== '') await deleteFile(image);
            return next(new ErrorHandler(errorStatusCode.InternalServerError, errorMsg.InternalServerError));
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const id: number = parseInt(req.params.id);
        if (!id) {
            return next(new ErrorHandler(errorStatusCode.InternalServerError, errorMsg.InternalServerError));
        }
        try {
            const checkIsExist = await this.service.checkExitById(id);
            if (!checkIsExist) {
                return next(
                    new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError)
                );
            }
            // 刪除Relation
            const product = await this.service.getById(id);
            if (!product) {
                return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.DataNotFound));
            }
            const tagsId: number[] = [];
            product?.tags.forEach(t => tagsId.push(t.id));
            product.tags = product.tags.filter(t => {
                tagsId.forEach(tId => {
                    return t.id !== tId
                })

            })
            const newProduct = await this.service.updateRelation(product);
            if(newProduct === undefined){
                return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError));
            }
            // 
            const param: IProductDeleteParams = { id };
            const deletedRes = await this.service.delete(param);
            if (deletedRes === undefined) {
                return next(
                    new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError)
                );
            }
            res.status(200).json({ result: true });
        } catch (error) {
            return next(
                new ErrorHandler(
                    errorStatusCode.InternalServerError,
                    errorMsg.InternalServerError
                )
            );
        }
    }
}

// const productRep = new ProductRepository();
// const productService = new ProductService(productRep);
// const productController = new ProductController(productService);

export default ProductController;