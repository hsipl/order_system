import { NextFunction, Request, Response } from "express";
import { validationResult } from 'express-validator';
import { HandoverService } from "../services/handover.service";
import ErrorHandler from "./error.controller";
import { errorMsg, errorStatusCode } from "../bases/errorTypes";
import { addHours } from 'date-fns';
import {
  IHandoverCreateParams,
  IHandoverUpdateParams,
  IHandoverDeleteParams,

} from '../interafaces/handover.interface';
const logger = require("../logger");
class HandoverController {
  private readonly service: HandoverService;

  constructor(service: HandoverService) {
    this.service = service;
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError));
    }
    const status: number = parseInt(String(req.query['status']));
    const id: number = parseInt(String(req.query['id']));
    if (id) {
      try {
        const handover = await this.service.getById(status, id);
        if (!handover) {
          return next(
            new ErrorHandler(errorStatusCode.BadRequest, errorMsg.DataNotFound)
          );
        }
        res.status(200).json(handover);
        logger.info(`[${req.ip}] - [${res.statusCode}] - [${req.method}] - [${req.originalUrl}] - [true]`)    
      }catch (error) {
        console.log("get handover by id error: ", error);
        return next(
          new ErrorHandler(
            errorStatusCode.InternalServerError,
            errorMsg.InternalServerError
          )
        );
      }

    }
    else {
      const handover = await this.service.getAll(status, id);
      res.status(200).json(handover);
      logger.info(`[${req.ip}] - [${res.statusCode}] - [${req.method}] - [${req.originalUrl}] - [true]`)
    }
  }
  async getByDate(req: Request, res: Response, next: NextFunction) {
    let date: Date = new Date(String(req.query['date']));
    date =  addHours(date, 4);
    if (!date) {
      return next(
        new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError)
      );
    }
    const handover = await this.service.getByDate(date);
    res.status(200).json(handover);
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
      if (!handoverExist||!sysmoney) {
        return next(new ErrorHandler(errorStatusCode.Forbidden, errorMsg.DataAlreadyExist));
      }
      const params: IHandoverCreateParams = {
        userId,
        sysmoney,
        realcash,
        status
      };

    const newHandover = await this.service.create(req, params);
    next(new ErrorHandler(200, "true"));  

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

    const id: number = parseInt(String(req.query['id']));
    const renewstatus: number = parseInt(String(req.query['status']));

    const {
      userId,
      sysmoney,
      realcash,
      status
    }: { userId: number; sysmoney: number; realcash: number; status: number } = req.body;

    try {
      const checkIsExist = await this.service.getById(renewstatus, id);
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
      if (!updateHandover) {
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
    next(new ErrorHandler(200, "true"));  
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError));
    }
    const id: number = parseInt(String(req.query['id']));
    const status: number = parseInt(String(req.query['status']));
    try {
      const checkIsExist = await this.service.getById(status, id);
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
    next(new ErrorHandler(200, "true"));  
  } 
}

export default HandoverController;
