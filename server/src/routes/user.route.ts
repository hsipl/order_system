import { NextFunction, Request, Response } from 'express';
import BasicRoute from '../bases/route.abstract';
import UserController from '../controller/user.controller';
import Auth from '../middlewares/auth';
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
    const auth = new Auth();
    this.router.post('/register', auth.authAdmin.bind(auth), controller.create.bind(controller));
    this.router.post('/login', controller.login.bind(controller));
    this.router.get('/logout', controller.logout.bind(controller));
  }
}
