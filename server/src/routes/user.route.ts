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
 *     consumes:
 *     - application/json
 *     - application/x-www-form-urlencoded
 *     produces:
 *     - application/json
 *     parameters:
 *     - name: username
 *       in: formData
 *       required: true
 *       type: string
 *     - name: password
 *       in: formData
 *       required: true
 *       type: string
 *     responses:
 *       200:
 *         description: login success
 * /user/logout:
 *   get:
 *     tags:
 *     - User
 *     consumes:
 *     - application/json
 *     - application/x-www-form-urlencoded
 *     produces:
 *     - application/json
 *     responses:
 *       200:
 *         description: logout success
 * /user/register:
 *    post:
 *      tags:
 *      - User
 *      consumes:
 *      - multipart/form-data
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: username
 *        in: formData
 *        required: true
 *        type: string
 *      - name: password
 *        in: formData
 *        required: true
 *        type: string
 *      - name: name
 *        in: formData
 *        required: true
 *        type: string
 *      - name: type
 *        in: formData
 *        required: true
 *        type: number
 *      - name: status
 *        in: formData
 *        required: true
 *        type: number
 *      - name: image
 *        in: formData
 *        required: true
 *        type: file
 *      - name: storeId
 *        in: formData
 *        required: true
 *        type: number
 *      responses:
 *        200:
 *          description: register success
 * /user/employee:
 *   get:
 *     tags:
 *     - User
 *     consumes:
 *     - application/json
 *     - application/x-www-form-urlencoded
 *     produces:
 *     - application/json
 *     responses:
 *       200:
 *         description: logout success
 *         schemas:
 *           type: array
 *           items:
 *             $ref: '#/conponents/schemas/User'
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
  }
}
