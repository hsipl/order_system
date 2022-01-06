import { Errback, NextFunction, Request, Response } from "express";
import ErrorHandler from "../controller/error.controller";

export default (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.statusCode).json({
    msg: err.message,
  });
};
