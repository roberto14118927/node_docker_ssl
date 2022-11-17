import multer  from 'multer';

import { Router } from 'express';
import { onBoardingController } from '../controllers/onboarding.controller.js';

const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
        cb(null, '')
    }
});

const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({ storage: storage, fileFilter: filefilter });

const router = Router();
/**
 * @openapi
 * '/api/onboarding/create':
 *  post:
 *     tags:
 *     - onboarding
 *     summary: Registro de boarding
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - title
 *              - description
 *              - url
 *            properties:
 *              title:
 *                type: string
 *                default: Kevin
 *              description:
 *                type: string
 *                default: 
 *              url:
 *                type: string
 *                default: Gerente
 *     responses:
 *      200:
 *        description: Create
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */
router.post('/create', upload.single('recfile'), (req, res) => onBoardingController.boarding_create(req, res));


/**
 * @openapi
 * '/api/onboarding/getAll':
 *  get:
 *     tags:
 *     - Boarding
 *     summary: Obtener lista boarding
 *     requestBody:
 *      required: false  
 *     responses:   
 *      200:
 *        description: getAll
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */
router.get('/getAll', (req, res) => onBoardingController.boarding_get_all(req, res));



export default router;