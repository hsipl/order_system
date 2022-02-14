import BasicRoute from "../bases/route.abstract";
import TagController from "../controller/tag.controller";
import Auth from '../middlewares/auth';

export default class TagRoute extends BasicRoute {
    constructor() {
        super();
        this.setPrefix("tag");
        this.setRoutes();
    }

    protected setRoutes() {
        const auth = new Auth();
        this.router.get("/", auth.authAdmin.bind(auth), (req, res, next) => TagController.get(req, res, next));
        this.router.get("/:id", auth.authAdmin.bind(auth), (req, res, next) => TagController.getById(req, res, next));
        this.router.post("/", auth.authAdmin.bind(auth), (req, res, next) => TagController.create(req, res, next));
        this.router.put("/:id", auth.authAdmin.bind(auth), (req, res, next) => TagController.update(req, res, next));
        this.router.delete("/:id", auth.authAdmin.bind(auth), (req, res, next) => TagController.delete(req, res, next));
    }
}