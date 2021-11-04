import { NextFunction, Request, Response } from "express";
import BasicRoute from "../bases/route.abstract";
import StoreController from "../controller/store.controller";

export default class StoreRoute extends BasicRoute {
    
    constructor() {
        super();
        this.setPrefix("store")
        this.setRoutes();
      }

    protected setRoutes() {
        this.router.get("/", (req,res,next) => StoreController.getAll(req,res,next));
        this.router.get("/:id", (req,res,next) => StoreController.getById(req,res,next));
        this.router.post("/", (req,res,next) => StoreController.create(req,res,next));
        this.router.put("/:id", (req,res,next) => StoreController.update(req,res,next));
        this.router.delete("/:id", (req,res,next) => StoreController.delete(req,res,next));
      }
}