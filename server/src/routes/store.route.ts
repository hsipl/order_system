import { body } from 'express-validator';
import BasicRoute from '../bases/route.abstract';
import StoreController from '../controller/store.controller';
import Auth from '../middlewares/auth';
import { StoreRepository } from '../repository/store.repository';
import { StoreService } from '../services/store.service';
import { upload } from '../utils/fileUpload';
import { StoreValidator } from '../validator/store';

export default class StoreRoute extends BasicRoute {
  constructor() {
    super();
    this.setPrefix('store');
    this.setRoutes();
  }

  protected setRoutes() {
    const controller = new StoreController(new StoreService(new StoreRepository()));
    const validator = new StoreValidator();
    const auth = new Auth();
    this.router.get('/', auth.authAdmin.bind(auth), controller.getAll.bind(controller));
    this.router.get(
      '/:id',
      auth.authAdmin.bind(auth),
      validator.getByID(),
      controller.getById.bind(controller),
    );
    this.router.post(
      '/',
      upload.single('image'),
      validator.create(),
      auth.authAdmin.bind(auth),
      controller.create.bind(controller),
    );
    this.router.put(
      '/:id',
      upload.single('image'),
      validator.update(),
      auth.authAdmin.bind(auth),
      controller.update.bind(controller),
    );
    this.router.delete(
      '/:id',
      auth.authAdmin.bind(auth),
      validator.delete(),
      controller.delete.bind(controller),
    );
  }
}
