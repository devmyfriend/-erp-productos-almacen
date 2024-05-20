import { Router } from 'express';
import { methods } from '../controllers/membresia.acceso.controller.js';
import { validateSchema } from '../middlewares/express-validator/index.js';
import * as schemas from '../schemas/acceso-membresia/index.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Accesos Membresias
 *     description: Operaciones relacionadas con los Accesos de Membresias
 */

/**
 * @swagger
 * /api/v1/membresias/acceso:
 *   get:
 *     summary: Obtener una lista Accesos por Membresias
 *     tags: [Accesos Membresias]
 *     responses:
 *       200:
 *         description: Lista de  Accesos por Membresias
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
 * /api/v1/membresias/acceso:
 *   post:
 *     summary: Crear un nuevo Acceso
 *     tags:
 *       - Accesos Membresias
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               NombreAcceso:
 *                 type: string
 *                 description: Nombre del acceso
 *               Horario:
 *                 type: string
 *                 description: Horario del acceso
 *               Completo:
 *                 type: boolean
 *                 description: Indica si el acceso está completo o no
 *               CreadoPor:
 *                 type: integer
 *                 description: ID del usuario que creó el acceso
 *     responses:
 *       200:
 *         description: Acceso creado exitosamente
 */

router.post(
	'/',
	schemas.createMembershipAccesSchema,
	validateSchema,
	methods.create,
);

export default router;
