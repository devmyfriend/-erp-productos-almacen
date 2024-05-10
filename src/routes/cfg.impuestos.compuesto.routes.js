import { Router } from 'express'
import { methods } from '../controllers/cfgimpuesto.compuesto.controller.js'
import * as schemas from '../schemas/Impuestos/index.js'
import { validateSchema } from '../middlewares/express-validator/index.js'
import { validateCompositeTaxId, validateNameCompositeTax, validatePredeterminedCompositeTax } from '../middlewares/taxs/index.js'
const router = Router()


/**
 * @swagger
 * tags:
 *   - name: Impuestos
 *     description: Administra los Impuestos.
 */

/**
 * @swagger
 * /api/v1/impuestos/compuestos/crear:
 *  post:
 *      summary: Crea un nuevo impuesto compuesto.
 *      tags: [Impuestos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                       Nombre:
 *                          type: string
 *                          description: Nombre del impuesto compuesto
 *                          example: IVA 16% 
 *                       Predeterminado: 
 *                          type: boolean
 *                          description: Bandera booleana para indicar si el impuesto compueto va ser predeterminado.
 *                          example: false 
 *                       CreadoPor: 
 *                          type: integer
 *                          description: El id del usuario que creo el impuesto compuesto.
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


router.post( '/crear', schemas.createCompositeTaxSchema, validateSchema, validateNameCompositeTax, validatePredeterminedCompositeTax , methods.createCompositeTax )


//todo crear calculos.
// router.post( '/iva/', methods.calculateCompoundTaxes)

/**
 * @swagger
 * /api/v1/impuestos/compuestos/lista:
 *   get:
 *      summary: En lista los impuestos compuestos
 *      tags: [Impuestos]
 *      responses:
 *        200:
 *          description: Lista de impuestos compuestos
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

router.get( '/lista', methods.getCompositeTaxList )

/**
 * @swagger
 * /api/v1/impuestos/compuestos/detalles/{ImpuestoCompuestoId}:
 *   get:
 *      summary: Buscar el Impuesto Compuesto por medio de su id
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
 *          description: Buscar el impuesto compuesto por medio de ImpuestoCompuestoId.
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

router.get( '/detalles/:ImpuestoCompuestoId', schemas.findCompositeTaxSchema, validateSchema, methods.getCompositeTax )

/**
 * @swagger
 * /api/v1/impuestos/compuestos/editar:
 *  put:
 *      summary: Actualiza un impuesto compuesto.
 *      tags: [Impuestos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                       ImpuestoCompuestoId:
 *                          type: integer
 *                          description: Identificador del impuesto compuesto
 *                          exmaple: 1
 *                       Nombre:
 *                          type: string
 *                          description: Nombre del impuesto compuesto
 *                          example: IVA 16% 
 *                       Predeterminado: 
 *                          type: boolean
 *                          description: Bandera booleana para indicar si el impuesto compueto va ser predeterminado.
 *                          example: false 
 *                       ActualizadoPor: 
 *                          type: integer
 *                          description: El id del usuario que actualizao el impuesto compuesto.
 *                          example: 1
 *      responses:
 *        200:
 *          description: Actaulización del impuesto compuesto.
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

router.put( '/editar', schemas.updateCompositeTaxSchema, validateCompositeTaxId, validateNameCompositeTax, validatePredeterminedCompositeTax, methods.updateCompositeTax )

/**
 * @swagger
 * /api/v1/impuestos/compuesto/borrar:
 *  delete:
 *      summary: Borra un impuesto compuesto.
 *      tags: [Impuestos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                       ImpuestoCompuestoId: 
 *                          type: integer
 *                          description: Identificador unico del impuesto compuesto
 *                          example: 17                  
 *                       BorradoPor: 
 *                          type: integer
 *                          description: El id del usuario que borro el impuesto compuesto.
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

router.delete( '/borrar', validateCompositeTaxId, methods.disableCompositeTax )

export default router