import { NextFunction, Request, Response } from 'express';
import BasicRoute from '../bases/route.abstract';
import StoreController from '../controller/store.controller';
import Auth from '../middlewares/auth';
import { StoreRepository } from '../repository/store.repository';
import { StoreService } from '../services/store.service';

export default class StoreRoute extends BasicRoute {
  constructor() {
    super();
    this.setPrefix('store');
    this.setRoutes();
  }

  protected setRoutes() {
    const controller = new StoreController(new StoreService(new StoreRepository()));
    const auth = new Auth();
    this.router.get('/', auth.authAdmin.bind(auth), controller.getAll.bind(controller));
    this.router.get('/:id', auth.authAdmin.bind(auth), controller.getById.bind(controller));
    this.router.post('/', auth.authAdmin.bind(auth), controller.create.bind(controller));
    this.router.put('/:id', auth.authAdmin.bind(auth), controller.update.bind(controller));
    this.router.delete('/:id', auth.authAdmin.bind(auth), controller.delete.bind(controller));
  }
}
