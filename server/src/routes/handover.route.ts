import Auth from '../middlewares/auth';
import { HandoverRepository } from '../repository/handover.repository';
import { HandoverService } from '../services/handover.service';
import BasicRoute from "../bases/route.abstract";
import HandoverController from "../controller/handover.controller";
import CacheService from '../services/cache.service';
import TurnoverController from '../controller/turnover.controller';
import { TurnoverService } from '../services/turnover.service';
import { TurnoverRepository } from '../repository/turnover.respository';
import { OrderService } from '../services/order.service';
import { OrderRepository } from '../repository/order.repository';

export default class HandoverRoute extends BasicRoute {
  constructor() {
    super();
    this.setPrefix("handover");
    this.setRoutes();
  }

  protected setRoutes() {
    const controller = new HandoverController(
      new HandoverService(new HandoverRepository(), new CacheService()),
    );
    const t = new TurnoverController(new TurnoverService(new TurnoverRepository()),new OrderService(new OrderRepository()));
    const auth = new Auth();
    this.router.get("/test", (req, res, next) =>
    t.calculate(req, res, next)
    );
    this.router.get("/date", auth.authAdmin.bind(auth), (req, res, next) =>
      controller.getByDate(req, res, next)
    );
    this.router.get("/", auth.authAdmin.bind(auth), (req, res, next) =>
      controller.getAll(req, res, next)
    );
    this.router.post("/", auth.authUser.bind(auth), (req, res, next) =>
      controller.create(req, res, next)
    );
    this.router.put("/", auth.authAdmin.bind(auth), (req, res, next) =>
      controller.update(req, res, next)
    );
    this.router.delete("/", auth.authAdmin.bind(auth), (req, res, next) =>
      controller.delete(req, res, next)
    );
    

  }
}
