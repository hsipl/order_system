import { NextFunction, Request, Response } from "express";
import { Store } from "../entity/store";
import { StoreRepository } from "../repository/store.repository";
import { StoreService } from "../services/store.service";
import ErrorHandler from "./error.controller";
import { errorMsg, errorStatusCode } from "../bases/errorTypes";

class StoreController {
  private readonly service: StoreService;

  constructor(service: StoreService) {
    this.service = service;
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    const stores = await this.service.getAll();
    res.status(200).json(stores);
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const id: number = parseInt(req.params.id);
    if (!id) {
      return next(
        new ErrorHandler(errorStatusCode.badRequest, errorMsg.ParameterError)
      );
    }
    try {
      const store = await this.service.getById(id);
      if (!store) {
        return next(
          new ErrorHandler(errorStatusCode.badRequest, errorMsg.dataNotFound)
        );
      }
      res.status(200).json(store);
    } catch (error) {
      // print to log
      console.log("create db error: ", error);
      return next(
        new ErrorHandler(
          errorStatusCode.InternalServerError,
          errorMsg.internalServerError
        )
      );
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const {
      name,
      status,
      type,
    }: { name: string; status: number; type: number } = req.body;
    if (!name || status === undefined || type === undefined) {
      return next(
        new ErrorHandler(errorStatusCode.badRequest, errorMsg.ParameterError)
      );
    }
    try {
      const storeExist = await this.service.checkExistByName(name);
      if (storeExist) {
        return next(
          new ErrorHandler(errorStatusCode.Forbidden, errorMsg.dataAlreadyExist)
        );
      }
      const newStore = await this.service.create(name, status, type);
      res.status(200).json(newStore);
    } catch (error) {
      // print to log
      console.log("create db error: ", error);
      return next(
        new ErrorHandler(
          errorStatusCode.InternalServerError,
          errorMsg.internalServerError
        )
      );
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const id: number = parseInt(req.params.id);
    const {
      name,
      status,
      type,
    }: { name: string; status: number; type: number } = req.body;
    if (!name || status === undefined || type === undefined) {
      return next(
        new ErrorHandler(errorStatusCode.badRequest, errorMsg.ParameterError)
      );
    }
    try {
      const checkIsExist = await this.service.checkExistByID(id);
      if (!checkIsExist) {
        return next(
          new ErrorHandler(errorStatusCode.badRequest, errorMsg.ParameterError)
        );
      }
      const updatedRes = await this.service.update(id, name, status, type);
      if (updatedRes === undefined) {
        return next(
          new ErrorHandler(errorStatusCode.badRequest, errorMsg.ParameterError)
        );
      }
      res.status(200).json(updatedRes);
    } catch (error) {
      // print to log
      console.log("create db error: ", error);
      return next(
        new ErrorHandler(
          errorStatusCode.InternalServerError,
          errorMsg.internalServerError
        )
      );
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const id: number = parseInt(req.params.id);
    if (!id) {
      return next(
        new ErrorHandler(
          errorStatusCode.InternalServerError,
          errorMsg.internalServerError
        )
      );
    }
    try {
      const checkIsExist = await this.service.checkExistByID(id);
      if (!checkIsExist) {
        return next(
          new ErrorHandler(errorStatusCode.badRequest, errorMsg.ParameterError)
        );
      }
      const deletedRes = await this.service.delete(id);
      if (deletedRes === undefined) {
        return next(
          new ErrorHandler(errorStatusCode.badRequest, errorMsg.ParameterError)
        );
      }
      res.status(200).json(deletedRes);
    } catch (error) {
      return next(
        new ErrorHandler(
          errorStatusCode.InternalServerError,
          errorMsg.internalServerError
        )
      );
    }
  }
}
const storeRepo = new StoreRepository();
const storeService = new StoreService(storeRepo);
const storeController = new StoreController(storeService);

export default storeController;