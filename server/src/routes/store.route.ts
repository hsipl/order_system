import { NextFunction, Request, Response } from 'express';
import BasicRoute from '../bases/route.abstract';
import StoreController from '../controller/store.controller';
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
    this.router.get('/', controller.getAll.bind(controller));
    this.router.get('/:id', controller.getById.bind(controller));
    this.router.post('/', controller.create.bind(controller));
    this.router.put('/:id', controller.update.bind(controller));
    this.router.delete('/:id', controller.delete.bind(controller));
  }
}
