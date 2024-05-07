import { Router } from "express";
import { methods } from "../controllers/cfg.impuesto.tasa.js";


const router = Router()

/**
 * @swagger
 * tags:
 *   - name: Impuestos por tasa
 *     description: Regisrta los impuestos por la tasa a sociado a él.
 */

/**
 * @swagger
 * /api/v1/impuestostasa/:
 *  post:
 *      summary: Crea una nueva relación de el impuesto a una tasa porcentual.
 *      tags: [Impuestos por tasa]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                      ImpuestoId:
 *                          type: integer
 *                          descritprion: Indica el id del impuesto creado.
 *                          example: 4 
 *                      Nombre: 
 *                          type: string
 *                          description: El nombre del impusto con su tasa porcentual a aplicar 
 *                          example: Ret. ISR 10.66
 *                      Tasa: 
 *                          type: decimal
 *                          description: Indica el valor porcentual que se usara para indicar su tasa
 *                          example: 10.66, 
 *                      Retencion: 
 *                          type: boolean
 *                          description: valor que permitira determinar si se va a operar como retención 
 *                          example: true 
 *                      TipoFactor:
 *                          type: integer
 *                          description: Para determinar si el impuesto se va operar por couta o por tasa, donde  0 es tasa y 1 es couta
 *                          example: 0
 *                      IVA_S_IEPS:
 *                          type: boolean
 *                          description: valor para indicar si el impuesto I.E.P.S. va ser sobre I.V.A. o va ser antes de IVA 
 *                          example: false 
 *                      Desglosar: 
 *                          type: boolean
 *                          description: es el valor par booleano para indicar si se va desglosar el impuesto I.E.P.S. en la impresión de los documentos.
 *                          example: false 
 *                      CreadoPor: 
 *                          type: integer
 *                          description: El id del usuario que crea la relación del impuesto con la tasa
 *                          example: 1
 *      responses:
 *        200:
 *          description: Creación impuesto con asignación de tasa y configuración
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

router.post( '/', methods.createTaxRate )

/**
 * @swagger
 * /api/v1/impuestostasa/{ImpuestoTasaId}:
 *  get:
 *      summary: Obtiene la configuración de la relación del impueto con la tasa.
 *      tags: [Impuestos por tasa]
 *      parameters:
 *          - in: path
 *            name: ImpuestoTasaId
 *            schema:
 *                type: integer
 *            required:  true
 *            description: El id que indica la relación del impuesto con la tasa y configuración
 *             
 *      responses:
 *        200:
 *          description: Obtiene la relación del impuesto con tasa y configuracion
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

router.get( '/:ImpuestoTasaId', methods.getTaxRate )

/**
 * @swagger
 * /api/v1/impuestostasa/:
 *  put:
 *      summary: Actualiza la relación de el impuesto a una tasa porcentual.
 *      tags: [Impuestos por tasa]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                      ImpuestoId:
 *                          type: integer
 *                          descritprion: Indica el id del impuesto creado.
 *                          example: 4 
 *                      Nombre: 
 *                          type: string
 *                          description: El nombre del impusto con su tasa porcentual a aplicar 
 *                          example: Ret. ISR 10.66
 *                      Tasa: 
 *                          type: decimal
 *                          description: Indica el valor porcentual que se usara para indicar su tasa
 *                          example: 10.66, 
 *                      Retencion: 
 *                          type: boolean
 *                          description: valor que permitira determinar si se va a operar como retención 
 *                          example: true 
 *                      TipoFactor:
 *                          type: integer
 *                          description: Para determinar si el impuesto se va operar por couta o por tasa, donde  0 es tasa y 1 es couta
 *                          example: 0
 *                      IVA_S_IEPS:
 *                          type: boolean
 *                          description: valor para indicar si el impuesto I.E.P.S. va ser sobre I.V.A. o va ser antes de IVA 
 *                          example: false 
 *                      Desglosar: 
 *                          type: boolean
 *                          description: es el valor par booleano para indicar si se va desglosar el impuesto I.E.P.S. en la impresión de los documentos.
 *                          example: false 
 *                      ActualizadoPor: 
 *                          type: integer
 *                          description: El id del usuario que actualizo la relación del impuesto con la tasas
 *                          example: 1
 *      responses:
 *        200:
 *          description: Actualización de impuesto tasa relacionada y configuración
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

router.put( '/', methods.updateTaxRate )

/**
 * @swagger
 * /api/v1/impuestostasa/:
 *  delete:
 *      summary: Borrar una relación de el impuesto a una tasa porcentual.
 *      tags: [Impuestos por tasa]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                      ImpuestoTasaId:
 *                          type: integer
 *                          descritprion: Es el indentificador unico de la realación que se va a borrar.
 *                          example: 4 
 *                      BorradoPor: 
 *                          type: integer
 *                          description: El id del usuario que crea la relación del impuesto con la tasa
 *                          example: 1
 *      responses:
 *        200:
 *          description: Creación impuesto con asignación de tasa y configuración
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

router.delete( '/', methods.disableTaxRate )

export default router