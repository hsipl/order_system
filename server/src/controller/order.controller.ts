import { NextFunction, Request, Response } from "express";
import { OrderService } from "../services/order.service";
import ErrorHandler from "./error.controller";
import { errorMsg, errorStatusCode } from "../bases/errorTypes";

class OrederController {
    public readonly service: OrderService;

    constructor(service: OrderService) {
        this.service = service;
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        const order = await this.service.getAll();
        res.status(200).json(order);
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        const id: number = parseInt(req.body.id);
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
        // let { description, status }: IOrderCreateParams
    }
}