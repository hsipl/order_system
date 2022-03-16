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
import Foo from "../src/middlewares/autocal";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

// create app class for server
export class App {
  private app: express.Application = express();
  foo = Foo;
  private mode: string;

  constructor() {
    this.mode = process.env.MODE ? process.env.MODE : "default";
    this.setDBConnection();
    this.setMiddleWare();
    this.swaggerDoc();
    this.setRoutes();
    this.app.use(errorHandler);
  }

  private setMiddleWare(): void {
    const imagePath = path.resolve(__dirname, "../uploads/images");
    this.app.use(express.static(imagePath));
    this.app.use(express.json());
    const corsOptions = {
      credentials: true,
      origin: [
        "http://140.125.45.154:3000",
        "http://140.125.45.161:3000",
        "http://140.125.45.167:3000",
        "http://140.125.45.167:6000",
        "http://localhost:3000",
        "http://localhost",
        "http://mymaskdetection.ddns.net",
      ],
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      allowedHeaders: ["Content-Type", "Authorization", "set_cookie"],
      credential: true,
    };
    this.app.use(cors(corsOptions));
    this.setSession();
    this.foo;
  }

  private swaggerDoc() {
    const options: swaggerJSDoc.Operation = {
      definition: {
        openapi: "3.0.0",
        info: {
          title: "Order System API Title",
          version: "1.0",
        },
        servers: [{ url: "http://localhost:8000/api/" }],
        components: {
          securitySchemas: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
        security: [{ bearerAuth: [] }],
      },
      // 這邊會是你想要產生的api文件檔案，我是直接讓swagger去列出所有controllers
      apis: ["./src/routes/*.ts", "./src/entity/*.ts"],
    };
    const specs = swaggerJSDoc(options);
    this.app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));
  }
  private setRoutes(): void {
    for (const route of router) {
      this.app.use(`/api/${route.getPrefix()}`, route.getRouter());
      console.log(`API: ${route.getPrefix().toUpperCase()} registered.`);
    }
  }

  private async setDBConnection() {
    try {
      console.log(`connect to mysql db on ${this.mode}`);
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
