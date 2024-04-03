import { body, param } from 'express-validator'

export const creatConversionUnitSchema = [
    body('UnidadOrigenId')
    .notEmpty()
    .isInt()
    .withMessage(
        'El campo UnidadOrigenId es obligatorio.'
    ),
    body('UnidadDestinoId')
    .notEmpty()
    .isInt()
    .withMessage(
        'El campo UnidadDestinoId es obligatorio.'
    ),
    body('FactorConversion')
    .notEmpty()
    .isDecimal()
    .custom( ( value ) => {
        console.log( value )
        if( parseFloat( value ) <= 0 ){

            throw new Error(' Factor no puede tener valor 0')
        }
        return true
    })
    .withMessage(
        'El campo FactorConversion es obligatorio y debe ser mayor que 0.'
    )
]

export const findByUnitSourceIdSchema = [
    param('unitsourceid')
    .notEmpty()
    .isInt()
    .withMessage(
        'El campo UnidadOrigenId es obligatorio.'
    )

]

export const updateConversionUnitSchema = [
    body('ConversionId')
    .notEmpty()
    .isInt()
    .withMessage(
        'El campo ConversionId es obligatorio.'
    ),
    body('UnidadDestinoId')
    .notEmpty()
    .isInt()
    .withMessage(
        'El campo UnidadDestinoId es obligatorio.'
    ),
    body('FactorConversion')
    .notEmpty()
    .isDecimal()
    .custom( ( value ) => {
        console.log( value )
        if( parseFloat( value ) <= 0 ){
            
            throw new Error(' Factor no puede tener valor 0')
        }
        return true
    })
    .withMessage(
        'El campo FactorConversion es obligatorio y debe ser mayor que 0.'
    )
]