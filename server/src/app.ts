import express from "express";
import { createConnection } from "typeorm";
import router from "./routes/route";
import "reflect-metadata";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import errorHandler from "./middlewares/errorhandler";
// create app class for server
export class App {
  private app: express.Application = express();

  constructor() {
    dotenv.config({
      path: path.resolve(__dirname),
    });
    this.setMiddleWare();
    this.setDBConnection();
    this.setRoutes();
  }

  private setMiddleWare(): void {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(errorHandler);
  }

  private setRoutes(): void {
    for (const route of router) {
      this.app.use(`/api/${route.getPrefix()}`, route.getRouter());
      console.log(`api: ${route.getPrefix()} registered.`);
    }
  }

  private async setDBConnection() {
    try {
      let mode = process.env.MODE;
      if (!mode) mode = "local";
      const connection = await createConnection(mode);
      if (connection.isConnected) {
        console.log("MySQL db already connect.");
      }
    } catch (error) {
      console.log(error);
      throw new Error("MySQL connection failed.");
    }
  }

  public boot(): void {
    const port = process.env.PORT || 8000;
    this.app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  }
}
