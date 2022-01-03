import { OrderService } from "../services/order.service";
import { OrderRepository } from "../repository/order.repository";
import OrederController from "../controller/order.controller";
import Auth from "../middlewares/auth";
import BasicRoute from "../bases/route.abstract";
import { ProductService } from "../services/product.service";
import { StoreService } from "../services/store.service";
import { StoreRepository } from "../repository/store.repository";
import CacheService from "../services/cache.service";
import { ProductRepository } from "../repository/product.repository";
import { upload } from '../utils/fileUpload';

export default class OrderRoute extends BasicRoute {
    constructor() {
        super();
        this.setPrefix("order");
        this.setRoutes();
    }
    protected setRoutes() {
        const auth = new Auth();
        const controller = new OrederController(
            new OrderService(new OrderRepository()),
            new ProductService(new ProductRepository()),
            new StoreService(new StoreRepository(), new CacheService())
        );
        this.router.get("/", auth.authUser.bind(auth), controller.getAll.bind(controller));
        this.router.get("/:id", auth.authUser.bind(auth), controller.getById.bind(controller));
        this.router.get("/:storeId", auth.authUser.bind(auth), controller.getByStoreId.bind(controller));
        this.router.post("/", auth.authAdmin.bind(auth), upload.single('image'), controller.create.bind(controller));
        this.router.delete("/:id", auth.authAdmin.bind(auth), upload.single('image'), controller.delete.bind(controller));
    }
}