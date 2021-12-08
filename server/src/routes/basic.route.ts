import { Request, Response } from 'express';
import BasicRoute from '../bases/route.abstract';

class BasicRoutes extends BasicRoute {
  constructor() {
    super();
    this.setPrefix('healthcheck');
    this.setRoutes();
  }

  protected setRoutes() {
    this.router.get('/', (req: Request, res: Response) => {
      res.json({
<<<<<<< HEAD
        msg: 'server is running without error. yang test',
=======
        msg: 'server is running without error.',
>>>>>>> c087372c69e60f11047453b2edf1ee17c9ff9a27
      });
    });
  }
}

export default BasicRoutes;
