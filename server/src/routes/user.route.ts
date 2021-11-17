import { NextFunction, Request, Response } from 'express';
import BasicRoute from '../bases/route.abstract';
import UserController from '../controller/user.controller';
import { UserRepository } from '../repository/user.repository';
import { UserService } from '../services/user.service';

export default class UserRoute extends BasicRoute {
  constructor() {
    super();
    this.setPrefix('user');
    this.setRoutes();
  }

  protected setRoutes() {
    const controller = new UserController(new UserService(new UserRepository()));
    this.router.post('/register', controller.create.bind(controller));
  }
}
