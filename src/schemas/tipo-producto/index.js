import { body } from 'express-validator';

export const createTypeProductSchema = [
	body('NombreTipoProducto')
		.notEmpty()
		.isString()
		.trim()
		.isLength({ min: 5, max: 20 })
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
