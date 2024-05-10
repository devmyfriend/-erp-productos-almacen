import { Router } from "express";
import { methods } from "../controllers/conversionunidad.controller.js";
import * as schema  from '../schemas/conversiones/index.js'
import { validateSchema } from "../middlewares/express-validator/index.js";
import { validateConversionId, validateIsUnitId } from "../middlewares/unit/index.js";

const router = Router()


/**
 * @swagger
 * tags:
 *   - name: Unidades de medidas
 *     description: Registro de conversiones de medida para los diversos productos.
 */

/**
 * @swagger
 * /api/v1/unidades/conversion/crear:
 *  post:
 *      summary: Crea una nueva conversión de unidad de medida.
 *      tags: [Unidades de medidas]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                      UnidadOrigenId:
 *                          type: integer
 *                          description: El UnidadId que sera la base para la conversión
 *                          example: 14
 *                      UnidadDestinoId:
 *                          type: integer
 *                          description: El UnidadId que sera la unidad a convertir
 *                          example: 13
 *                      FactorConversion:
 *                          type: decimal
 *                          description: Es el factor de conversión.
 *                          example: 30
 *                      CreadoPor:
 *                          type: integer
 *                          description: El id del usuario que crea la unidad de medida
 *                          example: 1
 *      responses:
 *        200:
 *          description: Creación de la conversion de unidad
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

router.post('/crear', schema.creatConversionUnitSchema, validateSchema, validateIsUnitId, methods.createUnitConversion)

/**
 * @swagger
 * /api/v1/unidades/conversion/lista:
 *   get:
 *      summary: En lista las conversiones .
 *      tags: [Unidades de medidas]
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


router.get('/lista', methods.findAll)

/**
 * @swagger
 * /api/v1/unidades/conversion/detalles/{unitsourceid}:
 *   get:
 *      summary: Buscar por UnidadId.
 *      tags: [Unidades de medidas]
 *      parameters:
 *        - in: path
 *          name: unitsourceid
 *          schema:
 *              type: integer
 *          required: true
 *          description: El id de la unidad de base para la conversión.
 *      responses:
 *        200:
 *          description: Buscar unidad de medida por medio de UnidadId que se establecio como unidad base.
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

router.get('/detalles/:unitsourceid', schema.findByUnitSourceIdSchema, validateSchema, methods.findByUnitSourceId)

/**
 * @swagger
 * /api/v1/unidades/conversion/editar:
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
 *                      ConversionId:
 *                          type: integer
 *                          description: El id de la conversión
 *                          example: 1
 *                      UnidadDestinoId:
 *                          type: integer
 *                          description: El id de la unidad de medida que a la que sera convertidad la base
 *                          example: 13
 *                      FactorConversion:
 *                          type: decimal
 *                          description: El numero de veces de unidades que conforma a la unidad base
 *                          example: 12
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

router.put('/editar', schema.updateConversionUnitSchema, validateSchema, validateConversionId, validateIsUnitId, methods.updateUnitConversion)

/**
 * @swagger
 * /api/v1/unidades/conversion/borrar:
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
 *                      ConversionId:
 *                          type: integer
 *                          description: El id de la Conversin de medida
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

router.delete('/borrar', schema.disableConversionUnitSchema, validateSchema, methods.disableConversionUnit)

export default router