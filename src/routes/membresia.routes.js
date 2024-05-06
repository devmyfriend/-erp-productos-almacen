import { Router } from 'express';
import { methods } from '../controllers/membresia.controller.js';
import { validateSchema } from '../middlewares/express-validator/index.js';
import * as schemas from '../schemas/membresia/index.js';

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

/**
 * @swagger
 * /api/v1/membresias/crear:
 *   post:
 *     summary: Crear un nuevo Producto e Insumo
 *     tags: [Membresias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               TipoMembresiaId:
 *                 type: number
 *                 example: 1
 *               NombreMembresia:
 *                 type: string
 *                 example: Nueva membresia
 *               Descripcion:
 *                 type: string
 *                 example: Ejemplo de una descripcion
 *               Puntos:
 *                 type: number
 *                 example: 10
 *               ClaveProductoServicio:
 *                 type: string
 *                 example: 010
 *               ClaveUnidadSat:
 *                 type: string
 *                 example: 1k
 *               CreadoPor:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Membresia creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    description: Mensaje de confirmación de la creación.
 *                    example: "Se ha creado la Membresia"
 */
router.post(
	'/crear',
	schemas.createMembershipSchema,
	validateSchema,
	methods.create,
);

/**
 * @swagger
 * /api/v1/membresias/editar:
 *   put:
 *     summary: Actualizar una membresía existente
 *     description: Endpoint para actualizar una membresía existente en la base de datos.
 *     tags: [Membresias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               MembresiaId:
 *                 type: integer
 *               TipoMembresiaId:
 *                 type: integer
 *               NombreMembresia:
 *                 type: string
 *                 example: Nueva membresia editada
 *               Descripcion:
 *                 type: string
 *                 example: Ejemplo de una descripcion editada
 *               Puntos:
 *                 type: number
 *                 example: 10
 *               ClaveProductoServicio:
 *                 type: string
 *                 example: 010
 *               ClaveUnidadSat:
 *                 type: string
 *                 example: 1k
 *               ActualizadoPor:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Membresia editada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    description: Mensaje de confirmación.
 *                    example: "Se ha editado la Membresia"
 */

router.put(
	'/editar',
	schemas.updateMembershipSchema,
	validateSchema,
	methods.update,
);

/**
 * @swagger
 * /api/v1/membresias/borrar:
 *   delete:
 *     summary: Eliminar una membresia
 *     tags: [Membresias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               MembresiaId:
 *                 type: integer
 *                 example: 1
 *               BorradoPor:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Membresia eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    description: Mensaje de confirmación.
 *                    example: "Membresia eliminada"
 */

router.delete(
	'/borrar',
	schemas.disableGenProductSchema,
	validateSchema,
	methods.disable,
);

export default router;
