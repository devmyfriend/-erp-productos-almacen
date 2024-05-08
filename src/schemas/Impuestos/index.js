import { body, param } from 'express-validator'

//cfgImpuestos

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

export const findByName =[
    param( 'taxname' )
    .isString()
    .notEmpty()
    .withMessage( 'No proporcion el TaxName' )
]

export const updateTaxSchema = [
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
    body( 'ActualizadoPor' )
    .notEmpty()
    .isNumeric()
    .withMessage( 'El campo CreadoPor es obligatorio' )
]

export const disableTax = [
    body( 'cfgImpuestoId' )
    .isInt()
    .notEmpty()
    .withMessage('El campo cfgImpuestoId es obligatortio y debe ser numérico '),
    body('BorradoPor')
    .isInt()
    .notEmpty()
    .withMessage('El campo BorradoPor es obligatorio y debe ser numérico')
]

//cfgImpuestosCompuetos

export const createCompositeTaxSchema = [
    body( 'Nombre' )
    .notEmpty()
    .isString()
    .isLength( { min: 3, max: 50 } )
    .withMessage('El campo Nombre es obligatorio y debe de tener un mínimo de 3 y un máximo de 50 caracteres'),
    body( 'Predeterminado' )
    .isBoolean()
    .withMessage('El campo Predeterminado solo adminite valores booleanos'),
    body( 'CreadoPor' )
    .isInt()
    .notEmpty()
    .withMessage('El campo CreapoPor es obligatorio y debe de ser un valor numérico')

]

export const findCompositeTaxSchema = [
    param( 'ImpuestoCompuestoId' )
    .isInt()
    .notEmpty()
    .withMessage('El parametro ImpuestoCompuestoId es obligatorio y debe ser del tipo numero')
]

export const updateCompositeTaxSchema = [
    body( 'ImpuestoCompuestoId' )
    .isInt()
    .notEmpty()
    .withMessage('El campo ImpuestoCompuestoId es obligatorio y debe ser numérico'),
    body( 'Nombre' )
    .notEmpty()
    .isString()
    .isLength( { min: 3, max: 50 } )
    .withMessage('El campo Nombre es obligatorio y debe de tener un mínimo de 3 y un máximo de 50 caracteres'),
    body( 'Predeterminado' )
    .isBoolean()
    .withMessage('El campo Predeterminado solo adminite valores booleanos'),
    body( 'ActualizadoPor' )
    .isInt()
    .notEmpty()
    .withMessage('El campo ActualizadoPor es obligatorio y debe de ser un valor numérico')
]

export const disableCompositeTaxSchema = [
    body( 'ImpuestoCompuestoId' )
    .isInt()
    .notEmpty()
    .withMessage('El campo ImpuestoCompuestoId es obligatorio y debe ser numérico'),
    body( 'BorradoPor' )
    .isInt()
    .notEmpty()
    .withMessage('El campo ActualizadoPor es obligatorio y debe de ser un valor numérico')
]



