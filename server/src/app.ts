import express from "express";
import router from "./routes/route";
import { Connection, createConnection } from "typeorm";
import "reflect-metadata";

// create app class for server
export class App {
  private app: express.Application = express();

  constructor() {
    this.setRoutes();
    this.setDBConnection();
  }
  private setRoutes(): void {
    for (const route of router) {
      this.app.use(`/api/${route.getPrefix()}`, route.getRouter());
    }
  }

  private async setDBConnection() {
    try {
      const connection = await createConnection();   
      if (connection.isConnected) {
        console.log("MySQL db already connect.");
      }
    } catch (error) {
      console.log(error);
      throw new Error("MySQL connection failed.");
    }
  }

  public boot(): void {
    this.app.listen(process.env.PORT, () => {
      console.log(`Server is running on ${process.env.PORT}`);
    });
  }
}
