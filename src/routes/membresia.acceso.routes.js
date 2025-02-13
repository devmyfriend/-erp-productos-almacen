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
 * /api/v1/membresias/acceso/crear:
 *   post:
 *     summary: Crear un nuevo Acceso
 *     tags: [Accesos Membresias]
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
 *               Completo:
 *                 type: boolean
 *                 description: Indica si el acceso está completo o no
 *               CreadoPor:
 *                 type: integer
 *                 description: ID del usuario que creó el acceso
 *     responses:
 *       200:
 *         description: Acceso creado exitosamente
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
	schemas.createMembershipAccesSchema,
	validateSchema,
	methods.create,
);

/**
 * @swagger
 * /api/v1/membresias/acceso/editar:
 *   put:
 *     summary: Crear un nuevo Acceso
 *     tags: [Accesos Membresias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               AccesoId:
 *                 type: integer
 *                 description: Id del acceso
 *               NombreAcceso:
 *                 type: string
 *                 description: Nombre del acceso
 *                 example: Regadera
 *               Completo:
 *                 type: boolean
 *                 description: Indica si el acceso está completo o no
 *               ActualizadoPor:
 *                 type: integer
 *                 description: Id del usuario que creó el acceso
 *     responses:
 *       200:
 *         description: Acceso editado exitosamente
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
	schemas.updateMembershipAccesSchema,
	validateSchema,
	methods.update,
);

/**
 * @swagger
 * /api/v1/membresias/acceso/borrar:
 *   delete:
 *     summary: Borrar un Acceso
 *     tags: [Accesos Membresias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               AccesoId:
 *                 type: integer
 *                 description: Id del acceso
 *               BorradoPor:
 *                 type: integer
 *                 description: Id del usuario que creó el acceso
 *     responses:
 *       200:
 *         description: Acceso borrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    description: Mensaje de confirmación.
 *                    example: "Se ha borrado el registro"
 */

router.delete(
	'/borrar',
	schemas.disableMembershipAccesSchema,
	validateSchema,
	methods.disable,
);

/**
 * @swagger
 * /api/v1/membresias/acceso/agregar:
 *   post:
 *     summary: Accesos por membresia
 *     tags: [Accesos Membresias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               MembresiaId:
 *                 type: integer
 *                 description: Id de membresia
 *               CreadoPor:
 *                 type: integer
 *                 description: ID del usuario que creó el acceso
 *               Accesos:
 *                 type: array
 *                 description: Array de objetos de Id de acceso
 *                 items:
 *                   type: object
 *                   properties:
 *                     AccesoId:
 *                       type: integer
 *                       example: 1
 *                       description: Id del acceso
 * 
 *     responses:
 *       200:
 *         description: Accesos agregados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de confirmación de .
 *                   example: "Se ha creado el registro"
 */

router.post(
	'/agregar',
	schemas.addAccessSchema,
	validateSchema,
	methods.addAccess,
);

export default router;
