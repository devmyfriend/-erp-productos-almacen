import { body, param } from 'express-validator'

export const createTaxSchema = [
    body( 'NombreImpuesto' )
    .notEmpty()
    .isString()
    .isLength( { min:3, max:50 } )
    .withMessage( 'El campo Nombre Impuesto es obligatorio y debe de contener de 3 a 5 caracteres' ),
    body( 'ClaveImpuesto' )
    .notEmpty()
    .isString()
    .isLength( { min: 3, max: 3 } )
    .withMessage('El campo ClaveImpuesto es obligatorio y debe de ser de 3 caracteres' ),
    body( 'CreadoPor' )
    .notEmpty()
    .isNumeric()
    .withMessage( 'El campo CreadoPor es obligatorio' )
]

export const findByIdTax = [
    param( 'taxid' )
    .isInt()
    .notEmpty()
    .withMessage( 'No proporciono el TaxtId' )
]

