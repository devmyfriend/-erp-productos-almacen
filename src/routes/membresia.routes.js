import { Router } from 'express';
import { methods } from '../controllers/membresia.controller.js';
import { validateSchema } from '../middlewares/express-validator/index.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Membresias
 *     description: Operaciones relacionadas con las Membresias
 *
 */

/**
 * @swagger
 * /api/v1/membresias:
 *   get:
 *     summary: Obtener una lista general de Membresias
 *     tags: [Membresias]
 *     responses:
 *       200:
 *         description: Lista de membresias
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

/**
 * @swagger
 * /api/v1/membresias/detalle/{id}:
 *   get:
 *     summary: Obtener detalles de una membresía por ID
 *     tags: [Membresias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la membresía a obtener detalles
 *     responses:
 *       200:
 *         description: Detalles de la membresía encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID de la membresía
 *                     nombre:
 *                       type: string
 *                       description: Nombre de la membresía
 *                     descripcion:
 *                       type: string
 *                       description: Descripción de la membresía
 */
router.get('/detalle/:id', methods.findById);

export default router;
