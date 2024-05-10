import { body, param } from 'express-validator'

export const creatUnitSchema =[
    body('NombreUnidad')
    .notEmpty()
    .isString()
    .isLength({ min: 2, max: 50 })
    .trim()
    .withMessage(
        'El campo NombreUnidad es obligatorio y debe de constar entre 2 y 50 caracteres'
    ),
    body('CreadoPor')
    .isInt()
    .notEmpty()
    .withMessage(
        'El campo CreadoPor deber ser un numero y no puede ser vario o null'
    )
]

export const findById = [
    param('unitid')
    .isInt()
    .notEmpty()
    .withMessage(
        'No proporciono la UnidadId'
    )
]

export const findByUnitName = [
    param('unitname')
    .isInt()
    .notEmpty()
    .isLength({ min:2, max: 50 })
    .withMessage(
        'No proporciono la UnidadNombre'
    )
]

export const updateUnit = [ 
    body('UnidadId')
    .isInt()
    .notEmpty()
    .withMessage(
        'El campo UnidadId deber ser un numero y no puede ser vario o null'
    ),
    body('NombreUnidad')
    .notEmpty()
    .isString()
    .isLength({ min: 2, max: 50 })
    .trim()
    .withMessage(
        'El campo NombreUnidad es obligatorio y debe de constar entre 2 y 50 caracteres'
    ),
    body('ActualizadoPor')
    .isInt()
    .notEmpty()
    .withMessage(
        'El campo ActualizadoPor deber ser un numero y no puede ser vario o null'
    )
]

export const disableUnit = [
    body('UnidadId')
    .isInt()
    .notEmpty()
    .withMessage(
        'El campo UnidadId deber ser un numero y no puede ser vario o null'
    ),
    body('ActualizadoPor')
    .isInt()
    .notEmpty()
    .withMessage(
        'El campo BorradoPor deber ser un numero y no puede ser vario o null'
    )
]