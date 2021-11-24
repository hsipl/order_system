import { NextFunction, Request, Response } from 'express';
import BasicRoute from '../bases/route.abstract';
import UserController from '../controller/user.controller';
import Auth from '../middlewares/auth';
import { StoreRepository } from '../repository/store.repository';
import { UserRepository } from '../repository/user.repository';
import CacheService from '../services/cache.service';
import { UserService } from '../services/user.service';
import { upload } from '../utils/fileUpload';
import { UserValidator } from '../validator/user';

export default class UserRoute extends BasicRoute {
  constructor() {
    super();
    this.setPrefix('user');
    this.setRoutes();
  }

  protected setRoutes() {
    const controller = new UserController(
      new UserService(new UserRepository(), new CacheService(), new StoreRepository()),
    );
    const auth = new Auth();
    const validator = new UserValidator();
    this.router.post(
      '/register',
      upload.single('image'),
      validator.register(),
      auth.authAdmin.bind(auth),
      controller.create.bind(controller),
    );
    this.router.post('/login', validator.login(), controller.login.bind(controller));
    this.router.get('/logout', controller.logout.bind(controller));
  }
}
