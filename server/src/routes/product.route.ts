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

/**
 * @swagger
 * /product:
 *   get:
 *     tags:
 *     - Product
 *     description: Get Product Data
 *     responses:
 *       200:
 *         description: Get Product Data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *   post:
 *     tags:
 *     - Product
 *     description: Create Product
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: number
 *               status:
 *                 type: number
 *               storeId:
 *                 type: number
 *               image:
 *                 type: file
 *               tags:
 *                 type: array
 *                 items:
 *                   number
 *             required:
 *             - name
 *             - price
 *             - category
 *             - status
 *             - storeId
 *             - image
 *             - tags
 *     responses:
 *       200:
 *         description: Create Product Success
 * /product/{productId}:
 *   put:
 *     tags:
 *     - Product
 *     description: Update Store Data
 *     parameters:
 *     - name: productId
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
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: number
 *               status:
 *                 type: number
 *               storeId:
 *                 type: number
 *               image:
 *                 type: file
 *               tags:
 *                 type: array
 *                 items:
 *                   type: number
 *             required:
 *             - name
 *             - price
 *             - category
 *             - status
 *             - storeId
 *             - image
 *             - tags
 *     responses: 
 *       200:
 *         description: Update Product Success
 *   get:
 *     tags:
 *     - Product
 *     description: Get Product Data
 *     parameters:
 *     - name: productId
 *       in: path
 *       required: true
 *       schema:
 *         type: number
 *     responses:
 *       200:
 *         description: Get Product Data
 *         content:
 *           appliction/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *   delete:
 *     tags:
 *     - Product
 *     description: Delete Product Data
 *     parameters:
 *     - name: productId
 *       in: path
 *       required: true
 *       schema:
 *         type: number
 *     responses:
 *       200:
 *         description: Delete Product Success
 * 
 */

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
        this.router.get("/", auth.authUser.bind(auth), controller.get.bind(controller));
        this.router.get("/:id",auth.authUser.bind(auth),  controller.getById.bind(controller));
        this.router.post("/", auth.authAdmin.bind(auth),  upload.single('image'),controller.create.bind(controller));
        this.router.put("/:id",auth.authAdmin.bind(auth),  upload.single('image'), controller.update.bind(controller));
        this.router.delete("/:id",auth.authAdmin.bind(auth),  controller.delete.bind(controller));
    }
}