import { Router } from 'express';
import { methods } from '../controllers/producto.controller.js';
import { validateSchema } from '../middlewares/express-validator/index.js';
import * as schemas from '../schemas/productos-generales/index.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Productos e Insumos
 *     description: Operaciones relacionadas con los Productos e Insumos
 */

/**
 * @swagger
 * /api/v1/productos:
 *   get:
 *     summary: Obtener una lista general del Productos e Insumos
 *     tags: [Productos e Insumos]
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
 * /api/v1/productos/detalle/{codigo}:
 *   get:
 *     summary: Obtener un producto por su código
 *     tags: [Productos e Insumos]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         description: código del producto a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalle del producto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: object
 *                   properties:
 *
 */
router.get('/detalle/:id', methods.findById);

/**
 * @swagger
 * /api/v1/productos/crear:
 *   post:
 *     summary: Crear un nuevo Producto e Insumo
 *     tags: [Productos e Insumos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               CodigoProducto:
 *                 type: string
 *                 example: 202000115HABS232
 *               NombreProducto:
 *                 type: string
 *                 example: Producto nuevo
 *               DescripcionProducto:
 *                 type: string
 *                 example: Nuevo producto
 *               ClaveProductoServicio:
 *                 type: string
 *                 example: 010
 *               ClaveUnidadSat:
 *                 type: string
 *                 example: 1k
 *               LineaId:
 *                 type: integer
 *                 example: 1
 *               TipoProductoId:
 *                 type: integer
 *                 example: 1
 *               Puntos:
 *                 type: integer
 *                 example: 2
 *               Serie:
 *                 type: boolean
 *               Venta:
 *                 type: boolean
 *               Insumo:
 *                 type: boolean
 *               CreadoPor:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    description: Mensaje de confirmación de la creación.
 *                    example: "Se ha creado el producto"
 */

router.post(
	'/crear',
	schemas.createGenProductSchema,
	validateSchema,
	methods.create,
);

/**
 * @swagger
 * /api/v1/productos/editar/{id}:
 *   put:
 *     summary: Editar un Producto
 *     tags: [Productos e Insumos]
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
 *               CodigoProducto:
 *                 type: string
 *                 example: 220102931028039sakvdd
 *               NombreProducto:
 *                 type: string
 *                 example: Producto editado
 *               DescripcionProducto:
 *                 type: string
 *                 example: Descripción actualizada
 *               ClaveProductoServicio:
 *                 type: string
 *                 example: 011
 *               ClaveUnidadSat:
 *                 type: string
 *                 example: 1l
 *               LineaId:
 *                 type: integer
 *                 example: 2
 *               TipoProductoId:
 *                 type: integer
 *                 example: 2
 *               Puntos:
 *                 type: integer
 *                 example: 3
 *               Serie:
 *                 type: boolean
 *                 example: true
 *               Venta:
 *                 type: boolean
 *                 example: true
 *               Insumo:
 *                 type: boolean
 *                 example: false
 *               ActualizadoPor:
 *                 type: integer
 *                 example: 123
 *     responses:
 *       200:
 *         description: Producto editado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de confirmación.
 *                   example: "Se ha editado el producto"
 */
router.put(
	'/editar/:id',
	schemas.updateGenProductSchema,
	validateSchema,
	methods.update,
);

/**
 * @swagger
 * /api/v1/productos/borrar:
 *   delete:
 *     summary: Eliminar un Producto
 *     tags: [Productos e Insumos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ProductoId:
 *                 type: integer
 *                 example: 1
 *               BorradoPor:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    description: Mensaje de confirmación.
 *                    example: "Producto eliminado"
 */

router.delete(
	'/borrar',
	schemas.disableGenProductSchema,
	validateSchema,
	methods.disable,
);

/**
 * @swagger
 * /api/v1/productos/activar:
 *   put:
 *     summary: Activar un Producto
 *     tags: [Productos e Insumos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ProductoId:
 *                 type: integer
 *                 example: 1
 *               ActualizadoPor:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Producto activado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    description: Mensaje de confirmación.
 *                    example: "Producto activado"
 */

router.put(
	'/activar',
	schemas.enableGenProductSchema,
	validateSchema,
	methods.enable,
);

export default router;
