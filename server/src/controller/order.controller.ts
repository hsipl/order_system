import { NextFunction, Request, Response } from "express";
import { OrderService } from "../services/order.service";
import { ProductService } from "../services/product.service";
import { StoreService } from "../services/store.service";
import ErrorHandler from "./error.controller";
import { errorMsg, errorStatusCode } from "../bases/errorTypes";
import { IOrderCreateParams, IOrderDeleteParams } from "../interafaces/order.interface";
import { Product } from "../entity/product";
import { deleteFile } from "../utils/fileUpload";
import { OrderProduct } from "../entity/orderProuct";

class OrederController {
    public readonly service: OrderService;
    public readonly productService: ProductService;
    public readonly storeService: StoreService;
    constructor(service: OrderService, productService: ProductService, storeService: StoreService) {
        this.service = service;
        this.productService = productService;
        this.storeService = storeService;
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        const order = await this.service.getAll();
        res.status(200).json(order);
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        const id: number = parseInt(req.params.id);
        if (!id) {
            return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError));
        }
        try {
            const order = await this.service.getById(id);
            if (!order) {
                return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.DataNotFound));
            }
            res.status(200).json(order);
        } catch (e) {
            console.log("get db by order id error", e);
            return next(new ErrorHandler(errorStatusCode.InternalServerError, errorMsg.InternalServerError));
        }
    }

    async getByStoreId(req: Request, res: Response, next: NextFunction) {
        const storeId: number = parseInt(req.body.storeId);
        if (!storeId) {
            return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError));
        }
        try {
            const order = await this.service.getByStoreId(storeId);
            if (!order) {
                return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.DataNotFound));
            }
            res.status(200).json(order);
        } catch (e) {
            console.log("get db by store id error", e);
            return next(new ErrorHandler(errorStatusCode.InternalServerError, errorMsg.InternalServerError));
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const image = req.file ? req.file.filename : '';
        let { status, storeId, pay, products }: IOrderCreateParams = req.body;
        const productID = products.map(item => item['id']);
        const descriptions = products.map(item => item["description"]);
        console.log(products);
        console.log(productID);
        console.log(descriptions);

        // let productData: Product[] | undefined;
        // productData = await this.productService.getByIds(<number[]>products);
        // if (!productData) {
        //     return next(new ErrorHandler(errorStatusCode.BadRequest, 'errorjsadjiasdjoisajdijsaoi'))
        // }
        // const productID = productData.map(item => Object.values(item)[0]);
        // console.log(productID);
        // const orderProducts: OrderProduct[] = []
        // if (productID.length !== 0) {

        // }
        // if (!status || !pay || !storeId) {
        //     if (image !== '') await deleteFile(image);
        //     return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError));
        // }
        try {
            //     const checkforeignKeyExit = await this.storeService.getById(storeId);
            //     if (!checkforeignKeyExit) {
            //         return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.StoreIdError));
            //     }
            //     let productsData: OrderProduct[] | undefined;
            //     if (productsData) {
            //         // productsData = await this.productService.getByIds(<number[]>products);
            //         if (!productsData) {
            //             return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ProductAssociationError));
            //         }
            //     }
            //     orderProducts = productsData;
            // const params = { status, storeId, pay };
            // const newOrder = await this.service.create(params, <Product[]>productData);
            res.status(200).json({ result: true });
        } catch (e) {
            console.log("create order db error: ", e);
            return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.InternalServerError))
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const id = parseInt(req.params.id);
        if (!id) {
            return next(new ErrorHandler(errorStatusCode.InternalServerError, errorMsg.InternalServerError));
        }
        try {
            const checkIsExist = await this.service.checkExitById(id);
            if (!checkIsExist) {
                return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.DataNotFound))
            }
            const param: IOrderDeleteParams = { id };
            const deletedRes = await this.service.delete(param);
            if (deletedRes === undefined) {
                return next(
                    new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError)
                );
            }
            res.status(200).json({ result: true });
        } catch (e) {
            return next(
                new ErrorHandler(
                    errorStatusCode.InternalServerError,
                    errorMsg.InternalServerError
                )
            );
        }
    }
}

export default OrederController;