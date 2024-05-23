import { Router } from 'express';
import { methods } from '../controllers/activo.controller.js';
import { validateSchema } from '../middlewares/express-validator/index.js';
import * as schemas from '../schemas/activo/index.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Activos
 *     description: Operaciones relacionadas con los Activos
 */

/**
 * @swagger
 * /api/v1/activos:
 *   get:
 *     summary: Obtener una lista general de Activos
 *     tags: [Activos]
 *     responses:
 *       200:
 *         description: Respuesta
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
 * /api/v1/activos/detalle/{ActivoId}:
 *   get:
 *     summary: Buscar Activos
 *     tags: [Activos]
 *     parameters:
 *       - in: path
 *         name: ActivoId
 *         required: true
 *         description: id activo
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Respuesta
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
router.get('/detalle/:id', methods.findById);

/**
 * @swagger
 * /api/v1/activos/buscar/{nombre}:
 *   get:
 *     summary: Buscar Activos
 *     tags: [Activos]
 *     parameters:
 *       - in: path
 *         name: nombre
 *         required: true
 *         description: id activo
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Respuesta
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
router.get('/buscar/:id', methods.findByName);

/**
 * @swagger
 * /api/v1/activos/crear:
 *   post:
 *     summary: Crear un nuevo activo
 *     tags: [Activos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               NombreActivo:
 *                 type: string
 *               Descripcion:
 *                 type: string
 *               Existencias:
 *                 type: integer
 *               Precio:
 *                 type: number
 *               ImpuestoCompuestoId:
 *                 type: integer
 *               LineaId:
 *                 type: integer
 *               CreadoPor:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Respuesta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    description: Mensaje de confirmación de la creación.
 *                    example: "Se ha creado el registro"
 */

router.post(
	'/crear',
	schemas.createAssetSchema,
	validateSchema,
	methods.create,
);

/**
 * @swagger
 * /api/v1/activos/editar:
 *   put:
 *     summary: Editar un nuevo activo
 *     tags: [Activos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ActivoId:
 *                 type: integer
 *               NombreActivo:
 *                 type: string
 *               Descripcion:
 *                 type: string
 *               Existencias:
 *                 type: integer
 *               Precio:
 *                 type: number
 *               ImpuestoCompuestoId:
 *                 type: integer
 *               LineaId:
 *                 type: integer
 *               ActualizadoPor:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Respuesta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    description: Mensaje de confirmación.
 *                    example: "Se ha editado el registro"
 */

router.put(
	'/editar',
	schemas.updateAssetSchema,
	validateSchema,
	methods.update,
);

/**
 * @swagger
 * /api/v1/activos/borrar:
 *   delete:
 *     summary: Eliminar un Activo
 *     tags: [Activos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ActivoId:
 *                 type: integer
 *                 example: 1
 *               BorradoPor:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Activo eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    description: Mensaje de confirmación.
 *                    example: "Activo eliminado"
 */
router.delete(
	'/borrar',
	schemas.disableAssetSchema,
	validateSchema,
	methods.disable,
);

export default router;
