import { NextFunction, Request, Response } from "express";
import Auth from '../middlewares/auth';
import { HandoverRepository } from '../repository/handover.repository';
import { HandoverService } from '../services/handover.service';

import BasicRoute from "../bases/route.abstract";
import HandoverController from "../controller/handover.controller";
import CacheService from '../services/cache.service';

export default class HandoverRoute extends BasicRoute {
  constructor() {
    super();
    this.setPrefix("handover");
    this.setRoutes();
  }

  protected setRoutes() {

    const auth = new Auth();
    this.router.get("/",  auth.authUser.bind(auth),(req, res, next) =>
    HandoverController.getAll(req, res, next)
    );
    this.router.get("/:id", auth.authUser.bind(auth), (req, res, next) =>
    HandoverController.getById(req, res, next)
    );
    this.router.post("/",  auth.authUser.bind(auth),(req, res, next) =>
    HandoverController.create(req, res, next)
    );
    this.router.put("/:id", auth.authAdmin.bind(auth), (req, res, next) =>
    HandoverController.update(req, res, next)
    );
    this.router.delete("/:id",  auth.authAdmin.bind(auth),(req, res, next) =>
    HandoverController.delete(req, res, next)
    );
  }
}
