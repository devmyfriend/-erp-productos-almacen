import { Router } from 'express'
import { methods } from '../controllers/cfg.impuestos.controller.js'
import * as schemas from '../schemas/Impuestos/index.js'
import { validateSchema } from '../middlewares/express-validator/index.js'
import { validateTaxCode, validateTaxId, validateTaxName } from '../middlewares/taxs/index.js'


const router = Router()

/**
 * @swagger
 * tags:
 *   - name: Impuestos
 *     description: Registro de impuestos.
 */

/**
 * @swagger
 * /api/v1/cfgimp:
 *  post:
 *      summary: Crea un nuevo impuesto.
 *      tags: [Impuestos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                      NombreImpuesto:
 *                          type: string
 *                          description: El nombre del impuesto a crear
 *                          example: IVA 16%
 *                      ClaveImpuesto:
 *                          type: string
 *                          description: Es la clave del tabla SAT_Impuesto
 *                          example: 002
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

router.post('/', schemas.createTaxSchema, validateSchema, validateTaxName, validateTaxCode,  methods.createTax)

/**
 * @swagger
 * /api/v1/cfgimp:
 *   get:
 *      summary: En lista los diferentes tipos de impuestos.
 *      tags: [Impuestos]  
 *      responses:
 *        200:
 *          description: Desplega el listado de impuestos.
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

router.get('/',methods.findAll)

/**
 * @swagger
 * /api/v1/cfgimp/{taxid}:
 *   get:
 *      summary: Busca el impuesto por medio del id
 *      tags: [Impuestos]
 *      parameters:
 *        - in: path
 *          name: taxid
 *          schema:
 *              type: integer
 *          required: true
 *          description: El id del cfgImpuesto.
 *      responses:
 *        200:
 *          description: Buscar el impuesto por medio del Id
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


router.get('/:taxid', schemas.findByIdTax, validateSchema, methods.findById)

/**
 * @swagger
 * /api/v1/cfgimp/{taxname}:
 *   get:
 *      summary: Busca el impuesto por medio del nombre del impuesto
 *      tags: [Impuestos]
 *      parameters:
 *        - in: path
 *          name: taxname
 *          schema:
 *              type: string
 *          required: true
 *          description: Es el nombre registrado del impuesto.
 *      responses:
 *        200:
 *          description: Buscar el impuesto por medio del nombre del impuesto
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

router.get('/impuesto/:taxname', schemas.findByName, validateSchema, methods.findByName)

/**
 * @swagger
 * /api/v1/cfgimp:
 *  put:
 *      summary: Actualiza los datos del impuesto
 *      tags: [Impuestos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                      cfgImpuestoId:
 *                          type: integer
 *                          description: El id del cfgImpuesto
 *                          example: 1
 *                      NombreImpuesto:
 *                          type: string
 *                          description: El nombre del impuesto
 *                          example: Pieza
 *                      ActualizadoPor:
 *                          type: integer
 *                          description: El id del usuario que actualiza el impuesto
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

router.put('/', schemas.updateTaxSchema, validateSchema, validateTaxId, validateTaxName, validateTaxCode, methods.updateTax)

/**
 * @swagger
 * /api/v1/cfgimp:
 *  delete:
 *      summary: Elimina el impuesto
 *      tags: [Impuestos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                      cfgImpuestoId:
 *                          type: integer
 *                          description: El id del cfgImpuesto
 *                          example: 1
 *                      ActualizadoPor:
 *                          type: integer
 *                          description: El id del usuario para borrar el impuesto
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

router.delete('/', schemas.disableTax, validateSchema, validateTaxId, methods.disableTax)

export default router