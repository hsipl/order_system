import { NextFunction, Request, Response } from "express";
import BasicRoute from "../bases/route.abstract";
import HandoverController from "../controller/handover.controller";

export default class HandoverRoute extends BasicRoute {
  constructor() {
    super();
    this.setPrefix("handover");
    this.setRoutes();
  }

  protected setRoutes() {
    this.router.get("/", (req, res, next) =>
    HandoverController.getAll(req, res, next)
    );
    this.router.get("/:id", (req, res, next) =>
    HandoverController.getById(req, res, next)
    );
    this.router.post("/", (req, res, next) =>
    HandoverController.create(req, res, next)
    );
    this.router.put("/:id", (req, res, next) =>
    HandoverController.update(req, res, next)
    );
    this.router.delete("/:id", (req, res, next) =>
    HandoverController.delete(req, res, next)
    );
  }
}
