import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';

const router = Router();
/**
 * @openapi
 * '/api/user/create':
 *  post:
 *     tags:
 *     - User
 *     summary: Crea usuario
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - username
 *              - last_name
 *              - email
 *              - phone_number
 *              - password
 *            properties:
 *              username:
 *                type: string
 *                default: Roberto Eduardo
 *              last_name:
 *                type: string
 *                default: Guzman Ruiz
 *              email:
 *                type: string
 *                default: roberto@gmail.com
 *              phone_number:
 *                type: string
 *                default: 9612724765
 *              password:
 *                type: string
 *                default: Monchi1234@
 *     responses:
 *      200:
 *        description: Create
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

router.post('/create', (req, res) => userController.user_create(req, res));






export default router;