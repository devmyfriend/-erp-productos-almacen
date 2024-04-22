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
 *               ClaveProductoServicio:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 8
 *                 description: Clave del producto o servicio (entre 3 y 8 caracteres).
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

export default router;
