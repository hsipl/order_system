import { body } from 'express-validator';
import BasicRoute from '../bases/route.abstract';
import StoreController from '../controller/store.controller';
import Auth from '../middlewares/auth';
import { StoreRepository } from '../repository/store.repository';
import { StoreService } from '../services/store.service';
import { upload } from '../utils/fileUpload';
import { StoreValidator } from '../validator/store';
import CacheService from '../services/cache.service';

/**
 * @swagger
 * /store:
 *   get:
 *     tags:
 *     - Store
 *     description: Get Store Data
 *     responses:
 *       200:
 *         description: Get Store Data
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Store'
 *   post:
 *     tags:
 *     - Store
 *     description: Create Store
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: number
 *               status:
 *                 type: number
 *               image:
 *                 type: file
 *             required:
 *             - name
 *             - type
 *             - status
 *             - image
 *     responses:
 *       200:
 *         description: Create Store Success
 * /store/{storeId}:
 *   get:
 *     tags:
 *     - Store
 *     description: Get Store Data
 *     parameters:
 *     - name: storeId
 *       in: path
 *       required: true
 *       schema:
 *         type: number
 *     responses:
 *       200:
 *         description: Get Store Data
 *   put:
 *     tags:
 *     - Store
 *     description: Update Store Data
 *     parameters:
 *     - name: storeId
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
 *               type:
 *                 type: number
 *               status:
 *                 type: number
 *               image:
 *                 type: file
 *             required:
 *             - name
 *             - type
 *             - status
 *             - image
 *     responses:
 *       200:
 *         description: Update Store Success
 *   delete:
 *     tags:
 *     - Store
 *     description: Delete Store Data
 *     parameters:
 *     - name: storeId
 *       in: path
 *       required: true
 *       schema:
 *         type: number
 *     responses:
 *       200:
 *         description: Delete Store Success
 */ 


export default class StoreRoute extends BasicRoute {
  constructor() {
    super();
    this.setPrefix('store');
    this.setRoutes();
  }

  protected setRoutes() {
    const controller = new StoreController(
      new StoreService(new StoreRepository(), new CacheService()),
    );
    const validator = new StoreValidator();
    const auth = new Auth();
    this.router.get('/', auth.authAdmin.bind(auth), controller.get.bind(controller));
    this.router.get(
      '/:id',
      auth.authAdmin.bind(auth),
      validator.getByID(),
      controller.getById.bind(controller),
    );
    this.router.post(
      '/',
      upload.single('image'),
      validator.create(),
      auth.authAdmin.bind(auth),
      controller.create.bind(controller),
    );
    this.router.put(
      '/:id',
      upload.single('image'),
      validator.update(),
      auth.authAdmin.bind(auth),
      controller.update.bind(controller),
    );
    this.router.delete(
      '/:id',
      auth.authAdmin.bind(auth),
      validator.delete(),
      controller.delete.bind(controller),
    );
  }
}
