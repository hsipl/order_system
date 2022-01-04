import { NextFunction, Request, Response } from "express";
import { Handover } from "../entity/handover";
import { HandoverRepository } from "../repository/handover.repository";
import { HandoverService } from "../services/handover.service";
import ErrorHandler from "./error.controller";
import { errorMsg, errorStatusCode } from "../bases/errorTypes";
import {
  IHandoverCreateParams,
  IHandoverUpdateParams,
  IHandoverDeleteParams,

} from '../interafaces/handover.interface';
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
        new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError)
      );
    }

    try {
      const handover = await this.service.getById(id);
      if (!handover) {
        return next(
          new ErrorHandler(errorStatusCode.BadRequest, errorMsg.DataNotFound)
        );
      }
      res.status(200).json(handover);
    } catch (error) {
      console.log("get product by id error: ", error);
      return next(
        new ErrorHandler(
          errorStatusCode.InternalServerError,
          errorMsg.InternalServerError
        )
      );
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {

    const {
      userId,
      sysmoney,
      realcash,
      status
    }: { userId: number; sysmoney: number; realcash: number; status: number } = req.body;
    const params: IHandoverCreateParams = {
      userId,
      sysmoney,
      realcash,
      status
    };
    if (!userId || !sysmoney) {
      return next(
        new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError)
      );
    }
    const newHandover = await this.service.create(req, params);
    res.status(200).send({ result: true });


  }
  async update(req: Request, res: Response, next: NextFunction) {
    const id: number = parseInt(req.params.id);

    const {
      userId,
      sysmoney,
      realcash,
      status
    }: { userId: number; sysmoney: number; realcash: number; status: number } = req.body;

    const params: IHandoverUpdateParams = {
      id,
      userId,
      sysmoney,
      realcash,
      status
    };

    const updateHandover = await this.service.update(params);

    if (!userId || !sysmoney) {
      return next(

        new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError),
      );
    }
    res.status(200).send({ result: true });
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const id: number = parseInt(req.params.id);
    const params: IHandoverDeleteParams = { id };
    const deletedRes = await this.service.delete(params);
    if (!id) {
      return next(
        new ErrorHandler(
          errorStatusCode.InternalServerError,
          errorMsg.InternalServerError
        )
      );
    }
    res.status(200).send({ result: true });
  }
}

export default HandoverController;
