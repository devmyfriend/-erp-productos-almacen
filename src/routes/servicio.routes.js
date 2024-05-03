import { Router } from 'express';
import { methods } from '../controllers/servicio.controller.js';
import { validateSchema } from '../middlewares/express-validator/index.js';
import * as schemas from '../schemas/servicios/index.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Servicios
 *     description: Operaciones relacionadas con los Servicios
 */

/**
 * @swagger
 * /api/v1/servicios:
 *   get:
 *     summary: Obtener una lista general del Productos e Insumos
 *     tags: [Servicios]
 *     responses:
 *       200:
 *         description: Lista del Productos e Insumos
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
 * /api/v1/servicios:
 *   post:
 *     summary: Crear un nuevo servicio
 *     tags: [Servicios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               TipoServicioId:
 *                 type: integer
 *                 description: ID del tipo de servicio.
 *               NombreServicio:
 *                 type: string
 *                 minLength: 5
 *                 description: Nombre del servicio (mínimo 5 caracteres).
 *                 example: Nuevo servicio
 *               ClaveProductoServicio:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 8
 *                 description: Clave del producto o servicio (entre 3 y 8 caracteres).
 *                 example: 0101
 *               ImpuestoCompuestoId:
 *                 type: integer
 *                 description: ID del impuesto compuesto.
 *               Cita:
 *                 type: boolean
 *                 description: Indica si el servicio requiere cita.
 *               CreadoPor:
 *                 type: integer
 *                 description: ID del usuario que creó el servicio.
 *     responses:
 *       200:
 *         description: Servicio creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    description: Mensaje de confirmación de la creación.
 *                    example: "Se ha creado el servicio"
 */

router.post('/', schemas.createServiceSchema, validateSchema, methods.create);

/**
 * @swagger
 * /api/v1/servicios/editar:
 *   put:
 *     summary: Editar un nuevo servicio
 *     tags: [Servicios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ServicioId:
 *                 type: integer
 *                 description: ID del servicio.
 *               TipoServicioId:
 *                 type: integer
 *                 description: ID del tipo de servicio.
 *               NombreServicio:
 *                 type: string
 *                 minLength: 5
 *                 description: Nombre del servicio (mínimo 5 caracteres).
 *                 example: Nuevo servicio
 *               ClaveProductoServicio:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 8
 *                 description: Clave del producto o servicio (entre 3 y 8 caracteres).
 *                 example: 0101
 *               ImpuestoCompuestoId:
 *                 type: integer
 *                 description: ID del impuesto compuesto.
 *               Cita:
 *                 type: boolean
 *                 description: Indica si el servicio requiere cita.
 *               ActualizadoPor:
 *                 type: integer
 *                 description: ID del usuario que EDITó el servicio.
 *     responses:
 *       200:
 *         description: Servicio creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    description: Mensaje de confirmación de la creación.
 *                    example: "Se ha editado el servicio"
 */
router.put(
	'/editar',
	schemas.updateServiceSchema,
	validateSchema,
	methods.update,
);

/**
 * @swagger
 * /api/v1/servicios/borrar:
 *   delete:
 *     summary: Eliminar un Servicio
 *     tags: [Servicios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ServicioId:
 *                 type: integer
 *                 example: 1
 *               BorradoPor:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Servicio eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    description: Mensaje de confirmación.
 *                    example: "Servicio eliminado"
 */

router.delete(
	'/borrar',
	schemas.disableServiceSchema,
	validateSchema,
	methods.disable,
);

/**
 * @swagger
 * /api/v1/servicios/activar:
 *   put:
 *     summary: Activar un Servicio
 *     tags: [Servicios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ServicioId:
 *                 type: integer
 *                 example: 1
 *               ActualizadoPor:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Servicio Activado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    description: Mensaje de confirmación.
 *                    example: "Servicio Activado"
 */

router.put(
	'/activar',
	schemas.enableServiceSchema,
	validateSchema,
	methods.enable,
);

export default router;
