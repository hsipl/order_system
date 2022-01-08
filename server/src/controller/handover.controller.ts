import { NextFunction, Request, Response } from "express";
import { validationResult } from 'express-validator';
import { Handover } from "../entity/handover";
// import { HandoverRepository } from "../repository/handover.repository";
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

  async getAllDelete(req: Request, res: Response, next: NextFunction) {
    const handovers = await this.service.getAllDelete();
    res.status(200).json(handovers);
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError));
    }
    const id: number = parseInt(req.params.id);
    try {
      const handover = await this.service.getById(id);
      if (!handover) {
        return next(
          new ErrorHandler(errorStatusCode.BadRequest, errorMsg.DataNotFound)
        );
      }
      res.status(200).json(handover);
    } catch (error) {
      console.log("get handover by id error: ", error);
      return next(
        new ErrorHandler(
          errorStatusCode.InternalServerError,
          errorMsg.InternalServerError
        )
      );
    }
  }

  async getByDeleteId(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError));
    }
    const id: number = parseInt(req.params.id);
    try {
      const handover = await this.service.getByDeleteId(id);
      if (!handover) {
        return next(
          new ErrorHandler(errorStatusCode.BadRequest, errorMsg.DataNotFound)
        );
      }
      res.status(200).json(handover);
    } catch (error) {
      console.log("get handover by id error: ", error);
      return next(
        new ErrorHandler(
          errorStatusCode.InternalServerError,
          errorMsg.InternalServerError
        )
      );
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError));
    }
    const {
      userId,
      sysmoney,
      realcash,
      status
    }: { userId: number; sysmoney: number; realcash: number; status: number } = req.body;

    try {
      const handoverExist = await this.service.checkExistByUserId(userId);
      if (!handoverExist || !sysmoney) {
        return next(new ErrorHandler(errorStatusCode.Forbidden, errorMsg.DataAlreadyExist));
      }
    const params: IHandoverCreateParams = {
      userId,
      sysmoney,
      realcash,
      status
    };

    const newHandover = await this.service.create(req, params);
    res.status(200).send({ result: true });

  } catch (error) {
    console.log('create handover error: ', error);
    return next(
      new ErrorHandler(errorStatusCode.InternalServerError, errorMsg.InternalServerError),
    );
  }
}

  async update(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError));
    }

    const id: number = parseInt(req.params.id);

    const {
      userId,
      sysmoney,
      realcash,
      status
    }: { userId: number; sysmoney: number; realcash: number; status: number } = req.body;

    try {
      const checkIsExist = await this.service.getById(id);
      if (!checkIsExist) {

        return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.DataNotFound));
      }
    const params: IHandoverUpdateParams = {
      id,
      userId,
      sysmoney,
      realcash,
      status
    };
    const updateHandover = await this.service.update(params);
    if (!updateHandover ) {
      return next(
        new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError),
      );
    }
    res.status(200).send({ result: true });
  } catch (error) {
    console.log('update handover error: ', error);
    return next(
      new ErrorHandler(errorStatusCode.InternalServerError, errorMsg.InternalServerError),
    );
  }
  }

  async updatedelete(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError));
    }
    const id: number = parseInt(req.params.id);
    const {
      userId,
      sysmoney,
      realcash,
      status
    }: { userId: number; sysmoney: number; realcash: number; status: number } = req.body;

    try {
      const checkIsExist = await this.service.getByDeleteId(id);
      if (!checkIsExist) {

        return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.DataNotFound));
      }
    const params: IHandoverUpdateParams = {
      id,
      userId,
      sysmoney,
      realcash,
      status
    };
    const updateHandover = await this.service.update(params);
    if (!updateHandover ) {
      return next(
        new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError),
      );
    }
    res.status(200).send({ result: true });
  } catch (error) {
    console.log('update handover error: ', error);
    return next(
      new ErrorHandler(errorStatusCode.InternalServerError, errorMsg.InternalServerError),
    );
  }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError));
    }
    const id: number = parseInt(req.params.id);
    try {
    const checkIsExist = await this.service.getById(id);    
    if (!checkIsExist) {
      return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError));
    }
    const params: IHandoverDeleteParams = { id };
    const deletedRes = await this.service.delete(params);
    if (!deletedRes) {
      return next(
        new ErrorHandler(
          errorStatusCode.InternalServerError,
          errorMsg.InternalServerError
        )
      );
    }
    res.status(200).send({ result: true });
  } catch (error) {
    return next(
      new ErrorHandler(errorStatusCode.InternalServerError, errorMsg.InternalServerError),
    );
  }
}
}

export default HandoverController;
