import { Router } from "express";
import { methods } from "../controllers/unidad.controller.js";
import * as schema from '../schemas/unidades/index.js';
import { validateSchema } from "../middlewares/express-validator/index.js";
import { validateFindUnitName, validateUnitId, validateUnitName } from "../middlewares/unit/index.js";


const router = Router()

/**
 * @swagger
 * tags:
 *   - name: Unidades de medidas
 *     description: Registro de unidades de medida para los diversos productos.
 */

/**
 * @swagger
 * /api/v1/unidades/crear:
 *  post:
 *      summary: Crea una nueva unidad de medida.
 *      tags: [Unidades de medidas]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                      NombreUnidad:
 *                          type: string
 *                          description: El nombre que se le asignara a la  unidad de medida
 *                          example: Pieza
 *                      CreadoPor:
 *                          type: integer
 *                          description: El id del usuario que crea la unidad de medida
 *                          example: 1
 *      responses:
 *        200:
 *          description: Creación de unidad e medida
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                   response:
 *                     type: array
 *                     items:
 *                       type: object
 */

router.post('/crear', schema.creatUnitSchema, validateSchema, validateUnitName, methods.create)

/**
 * @swagger
 * /api/v1/unidades/detalles/{unidadid}:
 *   get:
 *      summary: Buscar por UnidadId.
 *      tags: [Unidades de medidas]
 *      parameters:
 *        - in: path
 *          name: unitid
 *          schema:
 *              type: integer
 *          required: true
 *          description: El id de la unidad de medida.
 *      responses:
 *        200:
 *          description: Buscar unidad de medida por medio de UnidadId
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                   response:
 *                     type: array
 *                     items:
 *                       type: object
 */

router.get( '/detalles/:unitid', schema.findById, validateSchema, validateUnitId, methods.findById )

/**
 * @swagger
 * /api/v1/unidades/{unitname}:
 *   get:
 *      summary: Buscar por NombreUnidad.
 *      tags: [Unidades de medidas]
 *      parameters:
 *        - in: path
 *          name: unitname
 *          schema:
 *              type: string
 *          required: true
 *          description: El nombre de la unidad de medida.
 *      responses:
 *        200:
 *          description: Buscar unidad de medida por medio del nombre
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                   response:
 *                     type: array
 *                     items:
 *                       type: object
 */

router.get( '/detalles_nombre/:unitname',schema.findByUnitName,validateSchema, validateFindUnitName, methods.findByName )

/**
 * @swagger
 * /api/v1/unidades/lista:
 *   get:
 *      summary: Despliega todas las unidades de medias.
 *      tags: [Unidades de medidas]
 *      responses:
 *        200:
 *          description: Listado de las unidades de medias.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                   response:
 *                     type: array
 *                     items:
 *                       type: object
 */

router.get( '/lista', methods.findAll )

/**
 * @swagger
 * /api/v1/unidades/editar:
 *  put:
 *      summary: Actualiza los datos de la unidad de medida.
 *      tags: [Unidades de medidas]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                      UnidadId:
 *                          type: integer
 *                          description: El id de la unidad de medida
 *                          example: 1
 *                      NombreUnidad:
 *                          type: string
 *                          description: El nombre que se le asignara a la  unidad de medida
 *                          example: Pieza
 *                      ActualizadoPor:
 *                          type: integer
 *                          description: El id del usuario que actualiza la unidad de medida
 *                          example: 1
 *      responses:
 *        200:
 *          description: Actualización de unidad e medida
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                   response:
 *                     type: array
 *                     items:
 *                       type: object
 */

router.put( '/editar', schema.updateUnit, validateSchema, validateUnitName ,methods.update )

/**
 * @swagger
 * /api/v1/unidades/borrar:
 *  delete:
 *      summary: Deshabilita la unidad de medida.
 *      tags: [Unidades de medidas]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                      UnidadId:
 *                          type: integer
 *                          description: El id de la unidad de medida
 *                          example: 1
 *                      BorradoPor:
 *                          type: integer
 *                          description: El id del usuario que deshabilita la unidad de medida
 *                          example: 1
 *      responses:
 *        200:
 *          description: Actualización de unidad e medida
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                   response:
 *                     type: array
 *                     items:
 *                       type: object
 */

router.delete( '/borrar', schema.disableUnit, validateSchema, methods.disable )

export default router
