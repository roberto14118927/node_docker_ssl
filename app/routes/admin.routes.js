import { Router } from 'express';
import { dataController } from '../controllers/admin.controller.js';
import multer from 'multer';

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
 * '/api/admin/category/create':
 *  post:
 *     tags:
 *     - Admin
 *     summary: Crea categoria
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - category
 *              - description
 *            properties:
 *              category:
 *                type: string
 *                default: Category
 *              description:
 *                type: string
 *                default: Description
 *     responses:
 *      200:
 *        description: Create
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

router.post('/category/create', (req, res) => dataController.category_create(req, res));


/**
* @openapi
* '/api/admin/category/all':
*  get:
*     tags:
*     - Admin
*     summary: Obtener categorias
*     requestBody:
*      required: false  
*     responses:
*      200:
*        description: getAllx
*      400:
*        description: Bad Request
*      404:
*        description: Not Found
*/
router.get('/category/all', (req, res) => dataController.category_get_all(req, res));


/**
 * @openapi
 * '/api/admin/category/delete':
 *  delete:
 *     tags:
 *     - Admin
 *     summary: borrar
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - id
 *            properties:
 *              id:
 *                type: string
 *                default: 1
 *     responses:
 *      200:
 *        description: Delete
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

router.delete('/category/delete', (req, res) => dataController.category_delete(req, res));

/**
 * @openapi
 * '/api/admin/speaker/create':
 *  post:
 *     tags:
 *     - Admin
 *     summary: Crea Jueces y Ponentes
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - description
 *              - name
 *              - specialist
 *              - photo
 *            properties:
 *              description:
 *                type: string
 *                default: Description
 *              name:
 *                type: string
 *                default: Name
 *              specialist:
 *                type: string
 *                default: Specialist
 *              photo:
 *                 type: string
 *                 default: Specialist           
 *     responses:
 *      200:
 *        description: Create
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

router.post('/speaker/create', upload.single('recfile'), (req, res) => dataController.speaker_create(req, res));


/**
* @openapi
* '/api/admin/speaker/all':
*  get:
*     tags:
*     - Admin
*     summary: Obtener Jueces
*     requestBody:
*      required: false  
*     responses:
*      200:
*        description: getAllx
*      400:
*        description: Bad Request
*      404:
*        description: Not Found
*/
router.get('/speaker/all', (req, res) => dataController.speaker_get_all(req, res));


/**
 * @openapi
 * '/api/admin/speaker/delete':
 *  delete:
 *     tags:
 *     - Admin
 *     summary: borrar
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - id
 *            properties:
 *              id:
 *                type: string
 *                default: 1
 *     responses:
 *      200:
 *        description: Delete
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

router.delete('/speaker/delete', (req, res) => dataController.speaker_delete(req, res));


// FAQS ----------------------------------------------

/**
* @openapi
* '/api/admin/faq/create':
*  post:
*     tags:
*     - Admin
*     summary: Crea Pregunta
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - question
*              - response
*            properties:
*              question:
*                type: string
*                default: faq
*              response:
*                type: string
*                default: response
*     responses:
*      200:
*        description: Create
*      400:
*        description: Bad Request
*      404:
*        description: Not Found
*/

router.post('/faq/create', (req, res) => dataController.faq_create(req, res));


/**
* @openapi
* '/api/admin/faq/all':
*  get:
*     tags:
*     - Admin
*     summary: Obtener preguntas
*     requestBody:
*      required: false  
*     responses:
*      200:
*        description: getAllx
*      400:
*        description: Bad Request
*      404:
*        description: Not Found
*/
router.get('/faq/all', (req, res) => dataController.faq_get_all(req, res));


/**
 * @openapi
 * '/api/admin/faq/delete':
 *  delete:
 *     tags:
 *     - Admin
 *     summary: borrar
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - id
 *            properties:
 *              id:
 *                type: string
 *                default: 1
 *     responses:
 *      200:
 *        description: Delete
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

router.delete('/faq/delete', (req, res) => dataController.faq_delete(req, res));


export default router;