import express from "express";
import { Any, createConnection } from "typeorm";
import "reflect-metadata";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import session from "express-session";
import redis from "redis";
import connectRedis from "connect-redis";
import fs from "fs";
import { dirname } from "path/posix";
import router from "./routes/route";
import errorHandler from "./middlewares/errorhandler";
import * as _ from "./bases/declares/session";
import { config } from "./config/config";
import getConn from "./entity/index";
// create app class for server
export class App {
  private app: express.Application = express();

  private mode: string;

  constructor() {
    this.mode = process.env.MODE ? process.env.MODE : "default";
    this.setDBConnection();
    this.setMiddleWare();
    this.setRoutes();
    this.app.use(errorHandler);
  }

  private setMiddleWare(): void {
    const imagePath = path.resolve(__dirname, "../uploads/images");
    this.app.use(express.static(imagePath));
    this.app.use(express.json());
    const corsOptions = {
      credentials: true,
      origin: ["http://140.125.45.154", "http://140.125.45.161", "http://localhost", "http://mymaskdetection.ddns.net"],
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    }
    this.app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "http://140.125.45.161"); // update to match the domain you will make the request from
      next();
    });
    this.app.use(cors(corsOptions));
    this.setSession();
  }

  private setRoutes(): void {
    for (const route of router) {
      this.app.use(`/api/${route.getPrefix()}`, route.getRouter());
      console.log(`API: ${route.getPrefix().toUpperCase()} registered.`);
    }
  }

  private async setDBConnection() {
    try {
      const connection = await createConnection(this.mode);
      if (connection.isConnected) {
        console.log("MySQL db already connect.");
        getConn(connection);
      }
    } catch (error) {
      console.log(error);
      throw new Error("MySQL connection failed.");
    }
  }

  private setSession() {
    const RedisStore = connectRedis(session);
    const redisClient = redis.createClient({
      port: config[this.mode].REDIS_PORT,
      host: config[this.mode].REDIS_HOST,
    });
    this.app.use(
      session({
        secret: "kcy",
        // cookie -> secure: true | only for https
        cookie: { sameSite:'none',secure: true, httpOnly: true, maxAge: 1000 * 60 * 60 },
        resave: true,
        store: new RedisStore({
          client: redisClient,
        }),
        saveUninitialized: false,
      })
    );
  }

  // private genDataBySeed() {
  //   // const path = `${__dirname}/seed/`;
  //   // const files = fs.readdirSync(path);
  //   // for (const file of files) {
  //   //   const seed = require(path + file);
  //   //   seed.default();
  //   // }
  // }

  public boot(): void {
    const port = process.env.PORT || 8000;
    this.app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  }
}
