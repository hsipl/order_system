import BasicRoute from "../bases/route.abstract";
import TagController from "../controller/tag.controller";

export default class TagRoute extends BasicRoute {
    constructor() {
        super();
        this.setPrefix("tag");
        this.setRoutes();
    }

    protected setRoutes() {
        this.router.get("/", (req, res, next) => TagController.getAll(req, res, next));
        this.router.get("/:id", (req, res, next) => TagController.getById(req, res, next));
        this.router.post("/", (req, res, next) => TagController.create(req, res, next));
        this.router.put("/:id", (req, res, next) => TagController.update(req, res, next));
        this.router.delete("/:id", (req, res, next) => TagController.delete(req, res, next));
    }
}