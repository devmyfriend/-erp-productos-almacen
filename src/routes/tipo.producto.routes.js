import { Router } from 'express';
import { methods } from '../controllers/tipo.producto.controller.js';
import { validateSchema } from '../middlewares/express-validator/index.js';
import * as schemas from '../schemas/tipo-producto/index.js';

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

/**
 * @swagger
 * /api/v1/productos/tipo/crear:
 *   post:
 *     summary: Crear un nuevo tipo de producto
 *     tags: [Tipos de productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               NombreTipoProducto:
 *                 type: string
 *                 example: Limpieza
 *               DescripcionTipoProducto:
 *                 type: string
 *                 example: Es un producto de limpieza
 *               CreadoPor:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Tipo de producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    description: Mensaje de confirmación de la creación.
 *                    example: "Se ha creado el tipo de producto"
 */

router.post(
	'/crear',
	schemas.createTypeProductSchema,
	validateSchema,
	methods.create,
);

/**
 * @swagger
 * /api/v1/productos/tipo/editar/{id}:
 *   put:
 *     summary: Editar tipo de producto
 *     tags: [Tipos de productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Código del producto a editar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               NombreTipoProducto:
 *                 type: string
 *                 example: Limpieza (actualizado)
 *               DescripcionTipoProducto:
 *                 type: string
 *                 example: Es un producto de limpieza actualizado
 *               ActualizadoPor:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Tipo de producto editado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    description: Mensaje de confirmación de la creación.
 *                    example: "Se ha editado el tipo de producto"
 */

router.put(
	'/editar/:id',
	schemas.updateTypeProductSchema,
	validateSchema,
	methods.update,
);

export default router;
