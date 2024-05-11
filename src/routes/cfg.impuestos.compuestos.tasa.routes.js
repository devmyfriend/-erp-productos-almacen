import { Router } from "express";
import { methods } from '../controllers/cfgimpuesto.compuesto.tasa.controller.js'
import * as schemas from '../schemas/Impuestos/index.js'
import { validateSchema } from '../middlewares/express-validator/index.js'
import { validateCompositeTaxId, validateCompositeTaxIdByParam, validateCompositeTaxIdByTaxRate } from "../middlewares/taxs/index.js";


const router = Router()

/**
 * @swagger
 * tags:
 *   - name: Impuestos
 *     description: Rregistro de la relación de los impuestos compuestos por tasas de impuestos..
 */

/**
 * @swagger
 * /api/v1/impuestos/compuestos/tasas/crear:
 *  post:
 *      summary: Crea una nueva relación del impuesto compuestos con las diferentes tasas de impuestos.
 *      tags: [Impuestos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                      ImpuestoCompuestoId:
 *                          type: integer
 *                          description: El identificador unico del impuesto compuesto
 *                          example: 1 
 *                      ImpuestoTasaId:
 *                          type:  integer
 *                          description: El identificador unico del impuesto x tasa
 *                          example: 1 
 *                      CreadoPor:
 *                          type: integer
 *                          description: El id del usuario que creo la relación
 *                          example: 1
 *      responses:
 *        200:
 *          description: Creación de relaciones de impueto compuesto a tasa de impuestos.
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

router.post( '/crear', schemas.validateComsiteTaxbyTaxRate, validateSchema, validateCompositeTaxIdByTaxRate, methods.createCompositeTaxesxRate )

/**
 * @swagger
 * /api/v1/impuestos/compuestos/tasas/detalles/{ImpuestoCompuestoId}:
 *   get:
 *      summary: Busca las relaciones del impuiesto compuesto.
 *      tags: [Impuestos]
 *      parameters:
 *        - in: path
 *          name: ImpuestoCompuestoId
 *          schema:
 *              type: integer
 *          required: true
 *          description: El id del impuesto compuesto.
 *      responses:
 *        200:
 *          description: Busca todas las relaciones de los impuestos compuestos.
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

router.get('/detalles/:ImpuestoCompuestoId', schemas.validateGetComsiteTaxbyTaxRate, validateSchema, validateCompositeTaxIdByParam, methods.getDetailCompositeTaxesxRate )

/**
 * @swagger
 * /api/v1/impuestos/compuestos/tasas/editar:
 *  put:
 *      summary: actualiza la relación del impuesto compuestos con las diferentes tasas de impuestos.
 *      tags: [Impuestos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                      ImpuestoCompuestoId:
 *                          type: integer
 *                          description: El identificador unico del impuesto compuesto
 *                          example: 1 
 *                      ImpuestoTasaId:
 *                          type:  integer
 *                          description: El identificador unico del impuesto x tasa
 *                          example: 1 
 *                      ActualizadoPor:
 *                          type: integer
 *                          description: El id del usuario que actualizo la relación
 *                          example: 1
 *      responses:
 *        200:
 *          description: Actualización de relaciones de impueto compuesto a tasa de impuestos.
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

router.put( '/editar', schemas.validateComsiteTaxbyTaxRate, validateSchema, validateCompositeTaxIdByTaxRate, methods.updateCompositeTaxesxRate )

/**
 * @swagger
 * /api/v1/impuestos/compuestos/tasas/borrar:
 *  delete:
 *      summary: Borra la relación del impuesto compuestos con las diferentes tasas de impuestos.
 *      tags: [Impuestos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                      ImpuestoCompuestoId:
 *                          type: integer
 *                          description: El identificador unico del impuesto compuesto
 *                          example: 1 
 *                      ImpuestoTasaId:
 *                          type:  integer
 *                          description: El identificador unico del impuesto x tasa
 *                          example: 1 
 *                      BorradoPor:
 *                          type: integer
 *                          description: El id del usuario que actualizo la relación
 *                          example: 1
 *      responses:
 *        200:
 *          description: Borrado de relaciones de impueto compuesto a tasa de impuestos.
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

router.delete( '/borrar', schemas.validateDisableCompositeTaxByTaxRate, validateSchema, methods.disableCompositeTaxexxRate )

export default router