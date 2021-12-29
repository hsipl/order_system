import BasicRoute from "../bases/route.abstract";
import ProductController from "../controller/product.controller";
import { ProductRepository } from "../repository/product.repository";
import { StoreRepository } from "../repository/store.repository";
import { ProductService } from "../services/product.service";
import { StoreService } from "../services/store.service";
import CacheService from '../services/cache.service';
import { upload } from '../utils/fileUpload';
import { TagService } from "../services/tag.service";
import { TagRepository } from "../repository/tag.respository";
import Auth from '../middlewares/auth';

export default class ProductRoute extends BasicRoute {
    constructor() {
        super();
        this.setPrefix("product");
        this.setRoutes();
    }

    protected setRoutes() {
        const auth = new Auth();
        const controller = new ProductController(
            new ProductService(new ProductRepository),
            new StoreService(new StoreRepository(), new CacheService()),
            new TagService(new TagRepository())
        );
        this.router.get("/", auth.authAdmin.bind(auth), controller.getAll.bind(controller));
        this.router.get("/:id",auth.authAdmin.bind(auth),  controller.getById.bind(controller));
        this.router.get("/:id",auth.authAdmin.bind(auth),  controller.getById.bind(controller));
        this.router.post("/", auth.authAdmin.bind(auth),  upload.single('image'),controller.create.bind(controller));
        this.router.put("/:id",auth.authAdmin.bind(auth),  upload.single('image'), controller.update.bind(controller));
        this.router.delete("/:id",auth.authAdmin.bind(auth),  controller.delete.bind(controller));
    }
}