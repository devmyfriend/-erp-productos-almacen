import { body, param } from 'express-validator';

export const createServiceSchema = [
	body('TipoServicioId')
		.notEmpty()
		.isInt()
		.withMessage('El campo TipoServicioId debe ser un numero entero.'),

	body('NombreServicio')
		.notEmpty()
		.isString()
		.trim()
		.isLength({ min: 5 })
		.withMessage(
			'El campo NombreServicio  es obligatorio y debe tener almenos 5 caracteres.',
		),
	body('ClaveProductoServicio')
		.notEmpty()
		.isString()
		.trim()
		.isLength({ min: 3, max: 8 })
		.withMessage(
			'El campo ClaveProductoServicio es obligatorio y debe tener entre 3 y 8 caracteres.',
		),
	body('ImpuestoCompuestoId')
		.notEmpty()
		.isInt()
		.withMessage('El campo ImpuestoCompuestoId debe ser un numero entero'),
	body('Cita')
		.notEmpty()
		.isBoolean()
		.withMessage('El campo Cita es requerido y debe ser booleano.'),
	body('CreadoPor')
		.notEmpty()
		.isInt()
		.withMessage('El campo CreadoPor debe ser un número entero.'),
];

export const updateServiceSchema = [
	body('ServicioId')
		.notEmpty()
		.isInt()
		.withMessage('El campo TipoServicioId debe ser un numero entero.'),
	body('TipoServicioId')
		.notEmpty()
		.isInt()
		.withMessage('El campo TipoServicioId debe ser un numero entero.'),

	body('NombreServicio')
		.notEmpty()
		.isString()
		.trim()
		.isLength({ min: 5 })
		.withMessage(
			'El campo NombreServicio  es obligatorio y debe tener almenos 5 caracteres.',
		),
	body('ClaveProductoServicio')
		.notEmpty()
		.isString()
		.trim()
		.isLength({ min: 3, max: 8 })
		.withMessage(
			'El campo ClaveProductoServicio es obligatorio y debe tener entre 3 y 8 caracteres.',
		),
	body('ImpuestoCompuestoId')
		.notEmpty()
		.isInt()
		.withMessage('El campo ImpuestoCompuestoId debe ser un numero entero'),
	body('Cita')
		.notEmpty()
		.isBoolean()
		.withMessage('El campo Cita es requerido y debe ser booleano.'),
	body('ActualizadoPor')
		.notEmpty()
		.isInt()
		.withMessage('El campo ActualizadoPor debe ser un número entero.'),
];


export const disableServiceSchema  = [
	body('ServicioId')
		.notEmpty()
		.isInt()
		.withMessage('El campo ServicioId debe ser un numero entero  '),

	body('BorradoPor')
		.notEmpty()
		.isInt()
		.withMessage('El campo BorradoPor debe ser un número entero.'),
];


export const enableServiceSchema  = [
	body('ServicioId')
		.notEmpty()
		.isInt()
		.withMessage('El campo ServicioId debe ser un numero entero  '),

	body('ActualizadoPor')
		.notEmpty()
		.isInt()
		.withMessage('El campo ActualizadoPor debe ser un número entero.'),
];