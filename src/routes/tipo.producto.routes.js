import { Router } from 'express';
import { methods } from '../controllers/tipo.producto.controller.js';
import { validateSchema } from '../middlewares/express-validator/index.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Tipos de productos
 *     description: Operaciones relacionadas con los Tipos de productos
 */

/**
 * @swagger
 * /api/v1/productos/tipo:
 *   get:
 *     summary: Obtener una lista general del Tipos de productos
 *     tags: [Tipos de productos]
 *     responses:
 *       200:
 *         description: Lista de los tipos de producto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 */

router.get('/', methods.findAll);

export default router;
