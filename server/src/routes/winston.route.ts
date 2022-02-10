import { NextFunction, Request, Response } from "express";
import BasicRoute from "../bases/route.abstract";
import CacheService from '../services/cache.service';
import Auth from '../middlewares/auth';

var express = require('express');
var expressWinston = require('express-winston');
var winston = require('winston'); // for transports.Console

/*var app = module.exports = express();

app.use(express.bodyParser());
app.use(express.methodOverride());

// Let's make our express `Router` first.
var router = express.Router();
router.get('/error', function(req: Request, res: Response, next: NextFunction) {
  // here we cause an error in the pipeline so we see express-winston in action.
  return next(new Error("This is an error and it should be logged to the console"));
});

router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.write('This is a normal request, it should be logged to the console too');
  res.end();
});*/

export default class WinstonRoute extends BasicRoute {
    constructor() {
      super();
      this.setPrefix("winston");
      this.setRoutes();
    }
  
    protected setRoutes() {

      const auth = new Auth();

      this.router.get('/', function(req: Request, res: Response, next: NextFunction) {
        res.write('This is a normal request, it should be logged to the console too');
        res.end();
      });
      
     /* this.router.get("/",  auth.authAdmin.bind(auth),(req, res, next) =>
      controller.getAll(req, res, next)
      );*/
    }
  }
  
