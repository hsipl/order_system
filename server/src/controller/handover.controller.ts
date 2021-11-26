import { NextFunction, Request, Response } from "express";
import { Handover } from "../entity/handover";
import { HandoverRepository } from "../repository/handover.repository";
import { HandoverService } from "../services/handover.service";
import ErrorHandler from "./error.controller";
import { errorMsg, errorStatusCode } from "../bases/errorTypes";

class HandoverController {
  private readonly service: HandoverService;

  constructor(service: HandoverService) {
    this.service = service;
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    const handovers = await this.service.getAll();
    res.status(200).json(handovers);
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const id: number = parseInt(req.params.id);
    if (!id) {
      return next(
        new ErrorHandler(errorStatusCode.badRequest, errorMsg.ParameterError)
      );
    }
    try {
      const handover = await this.service.getById(id);
      if (!handover) {
        return next(
          new ErrorHandler(errorStatusCode.badRequest, errorMsg.dataNotFound)
        );
      }
      res.status(200).json(handover);
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
      user_id,
      sysmoney,
      realcash,
    }: { user_id: number; sysmoney: number; realcash: number } = req.body;
    if (!user_id || sysmoney === undefined || realcash === undefined) {
      return next(
        new ErrorHandler(errorStatusCode.badRequest, errorMsg.ParameterError)
      );
    }

  }

  async update(req: Request, res: Response, next: NextFunction) {
    const id: number = parseInt(req.params.id);
    const {
        user_id,
        sysmoney,
        realcash,
      }: { user_id: number; sysmoney: number; realcash: number } = req.body;
      if (!user_id || sysmoney === undefined || realcash === undefined) {
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
      const updatedRes = await this.service.update(id, user_id, sysmoney, realcash);
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
const handoverRepo = new HandoverRepository();
const handoverService = new HandoverService(handoverRepo);
const handoverController = new HandoverController(handoverService);

export default handoverController;
