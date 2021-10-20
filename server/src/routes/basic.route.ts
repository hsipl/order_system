import { Application as ExpressApplication, Request, Response, Router } from 'express';
import BasicRoute from '../bases/route.abstract';


class BasicRoutes extends BasicRoute {
    constructor() {
        super()
        this.setRoutes()
    }
    
    protected setRoutes() {
        this.router.get("/healthcheck",(req: Request, res: Response) => {
            res.json({
                "msg":"server is running without error."
            })
        })
    }
}

export default BasicRoutes