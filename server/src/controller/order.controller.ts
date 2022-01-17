import { NextFunction, Request, Response } from "express";
import { OrderService } from "../services/order.service";
import { ProductService } from "../services/product.service";
import { StoreService } from "../services/store.service";
import ErrorHandler from "./error.controller";
import { errorMsg, errorStatusCode } from "../bases/errorTypes";
import { IOrderCreateParams, IOrderDeleteParams, IOrderRequestParams, IOrderRespone} from "../interafaces/order.interface";
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
        const orderProduct = await this.orderProductController.getAll();
        const orders: IOrderRespone[] = [];
        order.forEach(o => {
            const orderProducts = orderProduct.filter(op => op.orderId === o.id);
            orders.push({ id: o.id, pay: o.pay, status: o.pay, orderProducts: orderProducts })
        });
        res.status(200).json(orders);
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
            const orderProduct = await this.orderProductController.getByIds(order.id);
            const orders: IOrderRespone = { id: order.id, pay: order.pay, status: order.pay, orderProducts: [] };
            if (orderProduct) {
                const orderProducts = orderProduct.filter(op => op.orderId === order.id);
                orders.orderProducts = orderProducts;
            }
            res.status(200).json(orders);
        } catch (e) {
            console.log("get db by order id error", e);
            return next(new ErrorHandler(errorStatusCode.InternalServerError, errorMsg.InternalServerError));
        }
    }

    async getByStoreId(req: Request, res: Response, next: NextFunction) {
        const storeId: number = parseInt(req.params.storeId);
        if (!storeId) {
            return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError));
        }
        try {
            const order = await this.service.getByStoreId(storeId);
            const orderProduct = await this.orderProductController.getAll();
            const orders: IOrderRespone[] = [];
            order.forEach(o => {
                const orderProducts = orderProduct.filter(op => op.orderId === o.id);
                orders.push({ id: o.id, pay: o.pay, status: o.pay, orderProducts: orderProducts })
            });
            if (!orders) {
                return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.DataNotFound));
            }
            res.status(200).json(orders);
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
            const productsId = products.map(item => item['productId']);
            const descriptions = products.map(item => item["description"]);
            // 確保 product 是否存在
            const productData = await this.productService.getByIds(productsId);
            if (!productData) {
                return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ProductAssociationError));
            }

            /** order 新增*/
            const param: IOrderCreateParams = { status, storeId, pay };
            const newOrder = await this.service.create(param);
            /** 新增orderProduct */
            const newOrderProduct = await this.orderProductController.create(products, productData, newOrder.id);
            res.status(200).json({ result: true });
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
        const order = await this.service.getById(id);
        if (!order) {
            return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.DataNotFound));
        }
        const oldOrderProduct = await this.orderProductController.getRelation(order);
        order.pay = pay;
        order.status = status;
        order.storeId = storeId;
        const productsId = products.map(item => item['productId']);
        const productData = await this.productService.getByIds(productsId);

        if (!productData) {
            return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ProductAssociationError));
        }
        const orderProductRes = await this.orderProductController.update(oldOrderProduct, products, productData, order.id)
        const orderRes = await this.service.update(order);
        if (orderRes === undefined) {
            return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.InternalServerError));
        }
        res.status(200).json({ result: true });
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