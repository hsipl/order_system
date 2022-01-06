import { NextFunction, Request, Response } from "express";
import { OrderService } from "../services/order.service";
import { ProductService } from "../services/product.service";
import { StoreService } from "../services/store.service";
import ErrorHandler from "./error.controller";
import { errorMsg, errorStatusCode } from "../bases/errorTypes";
import { IOrderCreateParams, IOrderDeleteParams, IOrderRequestParams } from "../interafaces/order.interface";
import { IOrderProductCreateParams } from "../interafaces/orderProduct.interafaces";
import OrderProductController from "./orderProduct.controller";

class OrederController {
    public readonly service: OrderService;
    public readonly productService: ProductService;
    public readonly storeService: StoreService;
    public orderProductController: OrderProductController;
    constructor(service: OrderService, productService: ProductService, storeService: StoreService, orderProductController: OrderProductController) {
        this.service = service;
        this.productService = productService;
        this.storeService = storeService;
        this.orderProductController = orderProductController;
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
        let { status, storeId, pay, products }: IOrderRequestParams = req.body;
        if (!products) {
            return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError));
        }
        try {
            const checkforeignKeyExit = await this.storeService.getById(storeId);
            if (!checkforeignKeyExit) {
                return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.StoreIdError));
            }
            const productsId = products.map(item => item['id']);
            const descriptions = products.map(item => item["description"]);
            // 確保 product 是否存在
            const productData = await this.productService.getByIds(productsId);
            if (!productData) {
                return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ProductAssociationError));
            }
            /** order 新增的 param */
            const param: IOrderCreateParams = { status, storeId, pay };
            const newOrder = await this.service.create(param);
            let orderProductData: IOrderProductCreateParams[] = [];
            if (!newOrder) {
                return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.InternalServerError));
            }
            const newOrderProduct = await this.orderProductController.create(products, newOrder, productData);
            res.status(200).json({ result: newOrderProduct });
        } catch (e) {
            console.log("create order db error: ", e);
            return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.InternalServerError))
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const id = parseInt(req.params.id);
        let { status, storeId, pay, products }: IOrderRequestParams = req.body;
        const checkforeignKeyExit = await this.storeService.getById(storeId);
        if (!checkforeignKeyExit) {
            return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.StoreIdError));
        }


        // const order = await this.service.getById(id);
        // if (!order) {
        //     return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.DataNotFound));
        // }
        // const orderProducts = await this.orderProductController.getByIds(order.id);
        // console.log(orderProducts);
        // console.log('---------');
        // const param = { status, storeId, pay, orderProducts };
        // Object.assign(order, param);
        // console.log(order);
        // const updatedRes = await this.service.update(order);
        // if (updatedRes === undefined) {
        //     return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.InternalServerError));
        // }
        res.status(200).json({ result: false });
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const id = parseInt(req.params.id);
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