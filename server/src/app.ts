import express from "express";
import { createConnection } from "typeorm";
import "reflect-metadata";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import session from "express-session";
import redis from "redis";
import connectRedis from "connect-redis";
import fs from "fs";
import router from "./routes/route";
import errorHandler from "./middlewares/errorhandler";
import * as _ from "./bases/declares/session";

dotenv.config({
  path: path.resolve(__dirname, "../"),
});

// create app class for server
export class App {
  private app: express.Application = express();

  constructor() {
    this.setMiddleWare();
    this.setDBConnection();
    this.setRoutes();
    this.app.use(errorHandler);
  }

  private setMiddleWare(): void {
    const imagePath = path.resolve(__dirname, "../uploads/images");
    this.app.use(express.static(imagePath));
    this.app.use(express.json());
    this.app.use(cors());
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
      const mode = process.env.MODE as string;
      const connection = await createConnection("dev");
      if (connection.isConnected) {
        console.log("MySQL db already connect.");
        // this.genDataBySeed();
      }
    } catch (error) {
      console.log(error);
      throw new Error("MySQL connection failed.");
    }
  }

  private setSession() {
    const RedisStore = connectRedis(session);
    const redisClient = redis.createClient({
      port: 6379,
      host: "localhost",
    });
    this.app.use(
      session({
        secret: "kcy",
        // cookie -> secure: true | only for https
        cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 },
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
