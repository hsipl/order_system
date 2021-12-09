import { NextFunction, Request, Response } from "express";
import { ProductRepository } from "../repository/product.repository";
import { ProductService } from "../services/product.service";
import ErrorHandler from "./error.controller";
import { errorMsg, errorStatusCode } from "../bases/errorTypes";
import { IProductCreateParams, IProductUpdateParams, IProductDeleteParams } from "../interafaces/product.interface";
class ProductController {
    public readonly service: ProductService;

    constructor(service: ProductService) {
        this.service = service;
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
        const { name, money, image, option, status }: IProductCreateParams = req.body;
        if (!name || !money || !option || status === undefined) {
            return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError));
        }
        try {
            const nameExit = await this.service.checkExistByName(name);
            if (nameExit) {
                return next(new ErrorHandler(errorStatusCode.Forbidden, errorMsg.DataAlreadyExist));
            }
            const params: IProductCreateParams = { name, money, image, option, status };
            const newProduct = await this.service.create(params);
            res.status(200).json(newProduct);
        } catch (error) {
            console.log("create db error: ", error);
            return next(new ErrorHandler(errorStatusCode.InternalServerError, errorMsg.InternalServerError));
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const id: number = parseInt(req.params.id);
        const { name, money, image, option, status }: IProductUpdateParams = req.body;
        if (!name || !money || !option || status === undefined) {
            return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError));
        }
        try {
            const nameExit = await this.service.checkExistByName(name);
            if (nameExit) {
                return next(new ErrorHandler(errorStatusCode.Forbidden, errorMsg.DataAlreadyExist));
            }
            const params: IProductCreateParams = { name, money, image, option, status };
            const updatedRes = await this.service.update(params);
            res.status(200).json(updatedRes);
        } catch (error) {
            console.log("create db error: ", error);
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
            const param: IProductDeleteParams = { id };
            const deletedRes = await this.service.delete(param);
            if (deletedRes === undefined) {
                return next(
                    new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError)
                );
            }
            res.status(200).json(deletedRes);
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

const productRep = new ProductRepository();
const productService = new ProductService(productRep);
const productController = new ProductController(productService);

export default productController;