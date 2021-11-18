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
        msg: 'server is running without error.',
      });
    });
  }
}

export default BasicRoutes;
