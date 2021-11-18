import { NextFunction, Request, Response } from 'express';
import { errorMsg, errorStatusCode } from '../bases/errorTypes';
import { ILoginUserParams } from '../interafaces/user.interface';
import { UserRepository } from '../repository/user.repository';
import { UserService } from '../services/user.service';
import ErrorHandler from './error.controller';

class UserController {
  constructor(private readonly service: UserService) {}

  public async create(req: Request, res: Response, next: NextFunction) {
    const { name, username, password }: { name: string; username: string; password: string } = req.body;
    if (!name || !username || !password) {
      return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError));
    }
    const user = {
      name,
      username,
      password,
    };
    try {
      const newUser = await this.service.create(user);
      if (newUser) {
        res.status(200).json(user);
      }
    } catch (error) {
      console.log('create user error:', error);
      return next(
        new ErrorHandler(errorStatusCode.InternalServerError, errorMsg.InternalServerError),
      );
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password }: { username: string; password: string } = req.body;
      if (!username || !password) {
        return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.ParameterError));
      }
      const params: ILoginUserParams = { username, password };
      const user = await this.service.login(params);
      if (!user) {
        return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.LoginFailed));
      }
      req.session.user = { username: user.username, role: user.type };
      res.status(200).json({ msg: 'login success.' });
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
      res.send('logout success.');
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.LogoutFailed));
    }
  }
}
export default UserController;
