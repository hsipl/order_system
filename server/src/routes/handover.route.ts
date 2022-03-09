import Auth from '../middlewares/auth';
import { HandoverRepository } from '../repository/handover.repository';
import { HandoverService } from '../services/handover.service';
import BasicRoute from "../bases/route.abstract";
import HandoverController from "../controller/handover.controller";
import CacheService from '../services/cache.service';
/**
 * @swagger
 * /Handover:
 *   get:
 *     tags:
 *     - Handover
 *     description: Get Handover Data
 *     responses:
 *       200:
 *         description: Get Handover Data
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Handover'
 *   post:
 *     tags:
 *     - Handover
 *     description: Create Handover
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: number
 *               sysmoney:
 *                 type: number
 *               realcash:
 *                 type: number
 *               status:
 *                 type: number
 *             required:
 *             - user_id
 *             - sysmoney
 *             - realcash
 *             - status
 *     responses:
 *       200:
 *         description: Create Handover Success
 *   put:
 *     tags:
 *     - Handover
 *     description: Update Handover Data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               handoverId:
 *                 type: number
 *               user_id:
 *                 type: string
 *               sysmoney:
 *                 type: number
 *               realcash:
 *                 type: number
 *               status:
 *                 type: number
 *             required:
 *             - handoverId
 *             - user_id
 *             - sysmoney
 *             - realcash
 *             - status
 *     responses: 
 *       200:
 *         description: Update Handover Success
 *   delete:
 *     tags:
 *     - Handover
 *     description: Delete Handover Data
 *     parameters:
 *     - name: handoverId
 *       required: true
 *       schema:
 *         type: number
 *     responses:
 *       200:
 *         description: Delete Handover Success
 */
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
    const auth = new Auth();
    this.router.get("/",  auth.authAdmin.bind(auth),(req, res, next) =>
    controller.getAll(req, res, next)
    );
    this.router.post("/",  auth.authUser.bind(auth),(req, res, next) =>
    controller.create(req, res, next)
    );
    this.router.put("/", auth.authAdmin.bind(auth), (req, res, next) =>
    controller.update(req, res, next)
    );
    this.router.delete("/",  auth.authAdmin.bind(auth),(req, res, next) =>
    controller.delete(req, res, next)
    );
    
  }
}
