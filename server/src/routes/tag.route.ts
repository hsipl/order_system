import BasicRoute from "../bases/route.abstract";
import TagController from "../controller/tag.controller";
import Auth from '../middlewares/auth';


/**
 * @swagger
 * /tag:
 *   get:
 *     tags:
 *     - Tag
 *     description: Get Tag Data
 *     responses:
 *       200:
 *         description: Get Tag Data
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tag'
 *   post:
 *     tags:
 *     - Tag
 *     description: Create Tag
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               tag:
 *                 type: string
 *               status:
 *                 type: number
 *             required:
 *             - tag
 *             - status
 *     responses:
 *       200:
 *         description: Create Tag Success
 * /tag/{tagId}:
 *   get:
 *     tags:
 *     - Tag
 *     description: Get Tag Data
 *     parameters:
 *     - name: tagId
 *       in: path
 *       required: true
 *       schema:
 *         type: number
 *     responses:
 *       200:
 *         description: Get Tag Data
 *   put:
 *     tags:
 *     - Tag
 *     description: Update Store Data
 *     parameters:
 *     - name: tagId
 *       in: path
 *       required: true
 *       schema:
 *         type: number
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               tag:
 *                 type: string
 *               status:
 *                 type: number
 *             required:
 *             - tag
 *             - status
 *     responses:
 *       200:
 *         description: Upadate Tag Success
 *   delete:
 *     tags:
 *     - Tag
 *     description: Delete Tag Data
 *     parameters:
 *     - name: tagId
 *       in: path
 *       required: true
 *       schema:
 *         type: number
 *     responses:
 *       200:
 *         description: Delete Tag Success
 */



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