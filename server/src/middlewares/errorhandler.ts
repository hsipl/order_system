import { Errback, NextFunction, Request, Response } from "express";
import ErrorHandler from "../controller/error.controller";
const logger = require("../logger");

export default (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => { 
  res.status(err.statusCode).json({
    msg: err.message,
  });
  logger.info(`[${req.ip}] - [${res.statusCode}] - [${req.method}] - [${req.originalUrl}] - [${err.message}]`)
};
