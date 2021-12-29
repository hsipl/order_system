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
      // print to log
      console.log("create db error: ", error);
      return next(
        new ErrorHandler(
          errorStatusCode.InternalServerError,
          errorMsg.InternalServerError
        )
      );
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    console.log(req.body)
    const {
      user_id,
      sysmoney,
      realcash,
      status
    }: { user_id: number; sysmoney: number; realcash: number ;status:number} = req.body;
    if (!user_id || sysmoney === undefined || realcash === undefined) {
      console.log(req.body)
      return next(
        new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError)
      );
    }
    res.status(200).json({res:true});

  }

  async update(req: Request, res: Response, next: NextFunction) {
    const id: number = parseInt(req.params.id);
    const {
        user_id,
        sysmoney,
        realcash,
        status
      }: { user_id: number; sysmoney: number; realcash: number ;status:number} = req.body;
      if (!user_id || sysmoney === undefined || realcash === undefined) {
      return next(
        new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError)
      );
    }

  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const id: number = parseInt(req.params.id);
    if (!id) {
      return next(
        new ErrorHandler(
          errorStatusCode.InternalServerError,
          errorMsg.InternalServerError
        )
      );
    }

  }
}
const handoverRepo = new HandoverRepository();
const handoverService = new HandoverService(handoverRepo);
const handoverController = new HandoverController(handoverService);

export default handoverController;
