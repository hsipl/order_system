import express from 'express';
import { createConnection } from 'typeorm';
import router from './routes/route';
import 'reflect-metadata';
import errorHandler from './middlewares/errorhandler';
import UserRouter from './controller/user.controller';
// create app class for server
export class App {
  private app: express.Application = express();

  constructor() {
    this.app.use(express.json());
    this.setDBConnection();
    this.setRoutes();
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
      const connection = await createConnection();
      if (connection.isConnected) {
        console.log('MySQL db already connect.');
      }
    } catch (error) {
      console.log(error);
      throw new Error('MySQL connection failed.');
    }
  }

  public boot(): void {
    const port = process.env.PORT || 8000;
    this.app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  }
}
