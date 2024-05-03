import { body, param } from 'express-validator';

export const createTypeProductSchema = [
	body('NombreTipoProducto')
		.notEmpty()
		.isString()
		.trim()
		.isLength({ min: 5, max: 50 })
		.withMessage(
			'El campo NombreTipoProducto es obligatorio y debe tener entre 5 y 20 caracteres.',
		),

	body('DescripcionTipoProducto')
		.notEmpty()
		.isString()
		.trim()
		.isLength({ min: 8 })
		.withMessage(
			'El campo DescripcionTipoProducto es obligatorio y debe tener almenos 8 caracteres.',
		),
	body('CreadoPor')
		.notEmpty()
		.isInt()
		.withMessage('El campo ActualizadoPor debe ser un número entero.'),
];

export const updateTypeProductSchema = [
	param('id')
		.notEmpty()
		.isInt({ min: 1 })
		.withMessage('El ID del tipo deproducto debe ser un número entero '),
	body('NombreTipoProducto')
		.notEmpty()
		.isString()
		.trim()
		.isLength({ min: 5, max: 50 })
		.withMessage(
			'El campo NombreTipoProducto es obligatorio y debe tener entre 5 y 20 caracteres.',
		),

	body('DescripcionTipoProducto')
		.notEmpty()
		.isString()
		.trim()
		.isLength({ min: 8 })
		.withMessage(
			'El campo DescripcionTipoProducto es obligatorio y debe tener almenos 8 caracteres.',
		),
	body('ActualizadoPor')
		.notEmpty()
		.isInt()
		.withMessage('El campo ActualizadoPor debe ser un número entero.'),
];

export const disableTypeProductSchema = [
	body('TipoProductoId')
		.notEmpty()
		.isInt()
		.withMessage('El campo TipoProductoId debe ser un numero entero  '),

	body('BorradoPor')
		.notEmpty()
		.isInt()
		.withMessage('El campo BorradoPor debe ser un número entero.'),
];

export const enableTypeProductSchema = [
	body('TipoProductoId')
		.notEmpty()
		.isInt()
		.withMessage('El campo TipoProductoId debe ser un numero entero  '),

	body('ActualizadoPor')
		.notEmpty()
		.isInt()
		.withMessage('El campo ActualizadoPor debe ser un número entero.'),
];
