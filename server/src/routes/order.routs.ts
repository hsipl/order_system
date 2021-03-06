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
import { OrderProductService } from "../services/orderProduct.service";
import { OrderProductRepository } from "../repository/orderProduct.repository";
import OrderProductController from "../controller/orderProduct.controller";
import { OrderValidator } from "../validator/order";

/**
 * @swagger
 * /order:
 *   get:
 *     tags:
 *     - Order
 *     description: Get Order Data
 *     responses:
 *       200:
 *         description: Get Order Data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *   post:
 *     tags:
 *     - Order
 *     description: Create Order
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               pay:
 *                 type: number
 *               status:
 *                 type: number
 *               storeId:
 *                 type: number
 *               products:
 *                 description: {productId:number}
 *                 type: array
 *                 items:
 *                   type: number
 *             required:
 *             - pay
 *             - status
 *             - storeId
 *             - products
 *     responses:
 *       200:
 *         description: Update Order Data
 * /order/{orderId}:
 *   get:
 *     tags:
 *     - Order
 *     description: Get Order Data
 *     parameters:
 *     - name: orderId
 *       in: path
 *       required: true
 *       schema:
 *         type: number
 *     responses:
 *       200:
 *         description: Get Order Data
 *   put:
 *     tags:
 *     - Order
 *     description: Update Order Data
 *     parameters:
 *     - name: orderId
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
 *               pay:
 *                 type: number
 *               status:
 *                 type: number
 *               storeId:
 *                 type: number
 *               products:
 *                 type: array
 *                 description: '{productId:number,description:string} or {id:number,description:string,name:string,price:number}'
 *                 items:
 *                   type:number
 *             required:
 *             - pay
 *             - status
 *             - storeId
 *             - products
 *     responses:
 *       200:
 *         description: Update Order Success
 *   delete:
 *     tags:
 *     - Order
 *     description: Delete Order Data
 *     parameters:
 *     - name: orderId
 *       in: path
 *       required: true
 *       schema:
 *         type: number
 *     responses:
 *       200:
 *         description: Delete Order Success
 */

export default class OrderRoute extends BasicRoute {
    constructor() {
        super();
        this.setPrefix("order");
        this.setRoutes();
    }
    protected setRoutes() {
        const validator = new OrderValidator()
        const auth = new Auth();
        const controller = new OrederController(
            new OrderService(new OrderRepository()),
            new ProductService(new ProductRepository()),
            new StoreService(new StoreRepository(), new CacheService()),
            new OrderProductController(new OrderProductService(new OrderProductRepository()))
        );
        this.router.get("/", auth.authUser.bind(auth), controller.getAll.bind(controller));
        this.router.get("/store/:storeId", auth.authUser.bind(auth), controller.getByStoreId.bind(controller));
        this.router.get("/:id", auth.authUser.bind(auth), controller.getById.bind(controller));        
        this.router.post("/", auth.authUser.bind(auth), validator.create(), controller.create.bind(controller));
        this.router.put("/:id", auth.authUser.bind(auth), validator.create(), controller.update.bind(controller));
        this.router.delete("/:id", auth.authUser.bind(auth), validator.delete(), controller.delete.bind(controller));
    }
}