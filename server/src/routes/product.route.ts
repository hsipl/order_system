import BasicRoute from "../bases/route.abstract";
import ProductController from "../controller/product.controller";

export default class ProductRoute extends BasicRoute {
    constructor() {
        super();
        this.setPrefix("product");
        this.setRoutes();
    }

    protected setRoutes() {
        this.router.get("/", (req, res, next) => ProductController.getAll(req, res, next));
        this.router.get("/:id", (req, res, next) => ProductController.getById(req, res, next));
        this.router.get("/:id", (req, res, next) => ProductController.getById(req, res, next));
        this.router.post("/", (req, res, next) => ProductController.create(req, res, next));
        this.router.put("/:id", (req, res, next) => ProductController.update(req, res, next));
        this.router.delete("/:id", (req, res, next) => ProductController.delete(req, res, next));
    }
}