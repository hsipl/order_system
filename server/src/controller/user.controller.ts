import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { errorMsg, errorStatusCode } from '../bases/errorTypes';
import { ILoginUserParams } from '../interafaces/user.interface';
import { UserRepository } from '../repository/user.repository';
import { StoreService } from '../services/store.service';
import { UserService } from '../services/user.service';
import ErrorHandler from './error.controller';
import { deleteFile } from '../utils/fileUpload';

class UserController {
  constructor(private readonly service: UserService) {}

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

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError));
      }
      const { username, password }: { username: string; password: string } = req.body;
      const params: ILoginUserParams = { username, password };
      const user = await this.service.login(params);
      if (!user) {
        return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.LoginFailed));
      }
      req.session.user = { username: user.username, role: user.type, storeID: user.storeId };
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
}
export default UserController;
