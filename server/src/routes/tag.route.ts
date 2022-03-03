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
 *     consumes:
 *     - application/json
 *     - application/x-www-form-urlencoded 
 *     produces:
 *     - application/json
 *     responses:
 *       200:
 *         description: Get Tag Data
 *         schema:
 *           type: array
 *           $ref: '#/components/schemas/Tag'
 *   post:
 *     tags:
 *     - Tag
 *     description: Create Tag
 *     consumes:
 *     - application/json
 *     - application/x-www-form-urlencoded
 *     produces:
 *     - application/json
 *     parameters:
 *     - name: tag
 *       in: formData
 *       required: true
 *       type: string
 *     - name: status
 *       in: formData
 *       required: true
 *       type: number
 *     responses:
 *       200:
 *         description: Create Tag Success
 * /tag/{tagId}:
 *   get:
 *     tags:
 *     - Tag
 *     description: Get Tag Data
 *     consumes:
 *     - application/json
 *     - application/x-www-form-urlencoded
 *     produces:
 *     - application/json
 *     parameters:
 *     - name: tagId
 *       in: path
 *       description: ID of Tag
 *       required: true
 *       type: number
 *     - name: tag
 *       in: formData
 *       required: true
 *       type: string
 *     responses:
 *       200:
 *         description: Get Tag Data
 *   put:
 *     tags:
 *     - Tag
 *     description: Update Store Data
 *     consumes:
 *     - application/json
 *     - multipart/form-data
 *     produces:
 *     - application/json
 *     parameters:
 *     - name: tagId
 *       in: path
 *       description: ID of Tag
 *       required: true
 *       type: number
 *     - name: tag
 *       in: formData
 *       required: true
 *       type: string
 *     - name: status
 *       in: formData
 *       required: true
 *       type: number
 *     responses:
 *       200:
 *         description: Upadate Tag Success
 *   delete:
 *     tags:
 *     - Tag
 *     description: Delete Tag Data
 *     consumes:
 *     - application/json
 *     produces:
 *     - application/json
 *     parameters:
 *     - name: tagId
 *       in: path
 *       description: Delete Tag Data
 *       consumes:
 *       - application/json
 *       produces:
 *       - application/json
 *       parameters:
 *       - name: tagId
 *         in: path
 *         description: ID of Tag
 *         required: true
 *         type: number
 *       responses:
 *         200:
 *           description: Delete Tag Success
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