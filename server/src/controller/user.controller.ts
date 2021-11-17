import { NextFunction, Request, Response } from 'express';
import { errorMsg, errorStatusCode } from '../bases/errorTypes';
import { UserRepository } from '../repository/user.repository';
import { UserService } from '../services/user.service';
import ErrorHandler from './error.controller';

class UserController {
  constructor(private readonly service: UserService) {}

  public async create(req: Request, res: Response, next: NextFunction) {
    const { name, username, password }: { name: string; username: string; password: string } = req.body;
    if (!name || !username || !password) {
      return next(new ErrorHandler(errorStatusCode.badRequest, errorMsg.ParameterError));
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
        new ErrorHandler(errorStatusCode.InternalServerError, errorMsg.internalServerError),
      );
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { username, password }: { username: string; password: string } = req.body;
  }
}

export default UserController;
