import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { errorMsg, errorStatusCode } from '../bases/errorTypes';
import { ILoginUserParams, IUpdateUserParams } from '../interafaces/user.interface';
import { UserRepository } from '../repository/user.repository';
import { StoreService } from '../services/store.service';
import { UserService } from '../services/user.service';
import ErrorHandler from './error.controller';
import { deleteFile } from '../utils/fileUpload';
import { User } from '../entity/user';

class UserController {
  constructor(private readonly service: UserService) { }

  public async create(req: Request, res: Response, next: NextFunction) {
    const image = req.file ? req.file.filename : '';
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (image !== '') await deleteFile(image);
      return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError));
    }
    const {
      name,
      username,
      password,
      storeId,
      type,
    }: { name: string; username: string; password: string; storeId: number; type: number } = req.body;

    const user = {
      name,
      username,
      password,
      storeId,
      image,
      type,
    };
    try {
      const isExist = await this.service.checkIsExistByUsernameAndName({ name, username });
      if (isExist) {
        return next(new ErrorHandler(errorStatusCode.Forbidden, errorMsg.DataAlreadyExist));
      }
      const newUser = await this.service.create(user, req);
      res.status(200).json({ msg: 'register success.' });
    } catch (error) {
      console.log('create user error:', error);
      if (image !== '') await deleteFile(image);
      return next(
        new ErrorHandler(errorStatusCode.InternalServerError, errorMsg.InternalServerError),
      );
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    const id: number = parseInt(req.params.id);
    let params: IUpdateUserParams = { id };
    params = Object.assign(params, req.body);
    try {
      const checkIsExist = await this.service.checkIsExitById(id);
      if (!checkIsExist) {
        return next(
          new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError)
        );
      }
      const updatedRes = await this.service.update(params);
      if (updatedRes === undefined) {
        return next(
          new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError)
        );
      }
      res.status(200).send({ result: true });
    } catch (error) {
      console.log('update user error:', error);
      return next(
        new ErrorHandler(errorStatusCode.InternalServerError, errorMsg.InternalServerError),
      );
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError));
      }
      const { username, password }: { username: string; password: string } = req.body;
      const params: ILoginUserParams = { username, password };
      const user = await this.service.login(params);
      if (!user || !user.storeId) {
        return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.LoginFailed));
      }
      req.session.user = {
        username: user.username,
        role: user.type,
        store: { id: user.storeId.id, type: user.storeId.type },
      };
      res.status(200).json({ msg: 'login success.', data: user });
    } catch (error) {
      console.log('error:', error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie('connect.sid');
      req.session.destroy((err) => {
        if (err) console.log('destory session error: ', err);
      });
      res.json({ msg: 'logout success.' });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.LogoutFailed));
    }
  }

  async getAllEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const employees = await this.service.getAllEmployee(req);
      res.status(200).json(employees);
    } catch (error) {
      console.log('get employees error: ', error);
      return next(
        new ErrorHandler(errorStatusCode.InternalServerError, errorMsg.InternalServerError),
      );
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const query = new User();
      Object.assign(query, req.query)
      const user = await this.service.getAllUser(req, query);
      res.status(200).json(user);
    } catch (error) {
      console.log('get user error: ', error);
      return next(
        new ErrorHandler(errorStatusCode.InternalServerError, errorMsg.InternalServerError),
      );
    }
  }

}

export default UserController;
