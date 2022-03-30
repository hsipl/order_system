import { NextFunction, Request, Response } from 'express';
import BasicRoute from '../bases/route.abstract';
import UserController from '../controller/user.controller';
import Auth from '../middlewares/auth';
import { StoreRepository } from '../repository/store.repository';
import { UserRepository } from '../repository/user.repository';
import CacheService from '../services/cache.service';
import { UserService } from '../services/user.service';
import { upload } from '../utils/fileUpload';
import { UserValidator } from '../validator/user';

/**
 * @swagger
 * /user/login:
 *   post:
 *     tags:
 *     - User
 *     description: Get Tag Data
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: number
 *             required:
 *             - username
 *             - password
 *     responses:
 *       200:
 *         description: login success
 * /user/logout:
 *   get:
 *     tags:
 *     - User
 *     responses:
 *       200:
 *         description: logout success
 * /user/register:
 *    post:
 *      tags:
 *      - User
 *      requestBody:
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                password:
 *                  type: number
 *                name:
 *                  type: string
 *                type:
 *                  type: number
 *                status:
 *                  type: number
 *                image:
 *                  type: file
 *                storeId:
 *                  type: number
 *              required:
 *              - username
 *              - password
 *              - name
 *              - type
 *              - status
 *              - image
 *              - storeId
 *      responses:
 *        200:
 *          description: register success
 * /user/employee:
 *   get:
 *     tags:
 *     - User
 *     description: ''
 *     responses:
 *       200:
 *         description: logout success
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       
 * 
 */

export default class UserRoute extends BasicRoute {
  constructor() {
    super();
    this.setPrefix('user');
    this.setRoutes();
  }

  protected setRoutes() {
    const controller = new UserController(
      new UserService(new UserRepository(), new CacheService(), new StoreRepository()),
    );
    const auth = new Auth();
    const validator = new UserValidator();
    this.router.post(
      '/register',
      upload.single('image'),
      validator.register(),
      auth.authAdmin.bind(auth),
      controller.create.bind(controller),
    );
    this.router.post('/login', validator.login(), controller.login.bind(controller));
    this.router.get('/logout', controller.logout.bind(controller));
    this.router.get(
      '/employee',
      auth.authAdmin.bind(auth),
      controller.getAllEmployee.bind(controller),
    );
    this.router.get('/user', auth.authAdmin.bind(auth), controller.getUser.bind(controller));
    this.router.put('/user/:id', auth.authAdmin.bind(auth), controller.update.bind(controller))
  }
}
