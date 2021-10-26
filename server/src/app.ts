import express from "express";
import dotenv from "dotenv";
import path from "path";
import router from "./routes/route";
import DBConnection from "./models/mysql";
// create app class for server
export class App {
  private app: express.Application = express();

  constructor() {
    this.setEnvironment();
    this.setRoutes();
    this.setDBConnection();
  }

  private setEnvironment(): void {
    dotenv.config({ path: path.resolve(__dirname, "./.env") });
  }

  private setRoutes(): void {
    for (const route of router) {
      this.app.use(`/api/${route.getPrefix()}`, route.getRouter());
    }
  }

  private async setDBConnection() {
    try {
      await DBConnection.authenticate({ logging: false });
      console.log("Connect to MySQL succeed");
    } catch (error) {
      throw new Error("MySQL test authentication failed.");
    }
  }

  public boot(): void {
    this.app.listen(process.env.PORT, () => {
      console.log(`Server is running on ${process.env.PORT}`);
    });
  }
}
