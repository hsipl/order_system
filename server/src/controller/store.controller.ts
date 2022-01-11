import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import fs from 'fs';
import { Store } from '../entity/store';
import { StoreRepository } from '../repository/store.repository';
import { StoreService } from '../services/store.service';
import ErrorHandler from './error.controller';
import { errorMsg, errorStatusCode } from '../bases/errorTypes';
import {
  IStoreCreateParams,
  IStoreDeleteParams,
  IStoreUpdateParams,
} from '../interafaces/store.interface';
import { checkFileExtName, deleteFile } from '../utils/fileUpload';

class StoreController {
  public readonly service: StoreService;

  constructor(service: StoreService) {
    this.service = service;
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    const stores = await this.service.getAll();
    res.status(200).json(stores);
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError));
    }
    const id: number = parseInt(req.params.id);
    try {
      const store = await this.service.getById(id);
      if (!store) {
        return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.DataNotFound));
      }
      res.status(200).json(store);
    } catch (error) {
      // print to log
      console.log('create db error: ', error);
      return next(
        new ErrorHandler(errorStatusCode.InternalServerError, errorMsg.InternalServerError),
      );
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    const image = req.file ? req.file.filename : '';
    if (!errors.isEmpty()) {
      if (image !== '') await deleteFile(image);
      return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError));
    }
    const { name, type }: { name: string; type: number } = req.body;

    try {
      const storeExist = await this.service.checkExistByName(name);
      if (storeExist) {
        if (image !== '') await deleteFile(image);
        return next(new ErrorHandler(errorStatusCode.Forbidden, errorMsg.DataAlreadyExist));
      }
      const params: IStoreCreateParams = {
        name,
        type,
        image,
      };
      const newStore = await this.service.create(req, params);
      res.status(200).json(newStore);
    } catch (error) {
      // print to log
      console.log('create db error: ', error);
      if (image !== '') await deleteFile(image);
      return next(
        new ErrorHandler(errorStatusCode.InternalServerError, errorMsg.InternalServerError),
      );
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    const image = req.file ? req.file.filename : '';
    if (!errors.isEmpty()) {
      if (image !== '') await deleteFile(image);
      return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError));
    }
    const id: number = parseInt(req.params.id);
    const { name, status, type }: { name: string; status: number; type: number } = req.body;

    try {
      const checkIsExist = await this.service.checkExistByID(id);
      if (!checkIsExist) {
        if (image !== '') await deleteFile(image);
        return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.DataNotFound));
      }
      const params: IStoreUpdateParams = {
        id,
        name,
        status,
        type,
        image,
      };
      const updatedRes = await this.service.update(params);
      if (updatedRes === undefined) {
        await deleteFile(image);
        return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.InternalServerError));
      }
      res.status(200).json(updatedRes);
    } catch (error) {
      // print to log
      console.log('create db error: ', error);
      if (image !== '') await deleteFile(image);
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
      const checkIsExist = await this.service.checkExistByID(id);

      if (!checkIsExist) {
        return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError));
      }
      const params: IStoreDeleteParams = { id };
      const deletedRes = await this.service.delete(params);
      if (deletedRes === undefined) {
        return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError));
      }
      res.status(200).json(deletedRes);
    } catch (error) {
      return next(
        new ErrorHandler(errorStatusCode.InternalServerError, errorMsg.InternalServerError),
      );
    }
  }
}

export default StoreController;
