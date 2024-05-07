import { Router } from "express";
import { methods } from '../controllers/cfgimpuesto.compuesto.tasa.controller.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   - name: Impuesto Compuesto x Tasa Impuesto
 *     description: Rregistro de la relación de los impuestos compuestos por tasas de impuestos..
 */

/**
 * @swagger
 * /api/v1/impcompxtasaimp:
 *  post:
 *      summary: Crea una nueva relación del impuesto compuestos con las diferentes tasas de impuestos.
 *      tags: [Impuesto Compuesto x Tasa Impuesto]
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

router.post( '/', methods.createCompositeTaxesxRate )

/**
 * @swagger
 * /api/v1/impcompxtasaimp/detail/{ImpuestoCompuestoId}:
 *   get:
 *      summary: Busca las relaciones del impuiesto compuesto.
 *      tags: [Impuesto Compuesto x Tasa Impuesto]
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

router.get('/detail/:ImpuestoCompuestoId', methods.getDetailCompositeTaxesxRate )

/**
 * @swagger
 * /api/v1/impcompxtasaimp:
 *  put:
 *      summary: actualiza la relación del impuesto compuestos con las diferentes tasas de impuestos.
 *      tags: [Impuesto Compuesto x Tasa Impuesto]
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

router.put( '/', methods.updateCompositeTaxesxRate )

/**
 * @swagger
 * /api/v1/impcompxtasaimp:
 *  delete:
 *      summary: Borra la relación del impuesto compuestos con las diferentes tasas de impuestos.
 *      tags: [Impuesto Compuesto x Tasa Impuesto]
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

router.delete( '/', methods.disableCompositeTaxexxRate )

export default router