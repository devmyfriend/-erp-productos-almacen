import { body } from 'express-validator';

export const createAssetSchema = [
	body('NombreActivo')
		.notEmpty()
		.isString()
		.trim()
		.withMessage(
			'Nombre del activo es requerido y debe ser una cadena de texto.',
		)
		.isLength({ min: 1, max: 255 })
		.withMessage('Nombre del activo debe tener entre 1 y 255 caracteres.'),
	body('Descripcion')
		.notEmpty()
		.isString()
		.trim()
		.withMessage(
			'Descripción del activo es requerida y debe ser una cadena de texto.',
		),
	body('Existencias')
		.notEmpty()
		.isInt({ min: 0 })
		.withMessage('Existencias debe ser un número entero no negativo.'),
	body('Precio')
		.notEmpty()
		.isNumeric({ min: 0 })
		.withMessage('Precio debe ser un número positivo.'),
	body('ImpuestoCompuestoId')
		.notEmpty()
		.isInt({ min: 0 })
		.withMessage(
			'ID de impuesto compuesto debe ser un número entero no negativo.',
		),
	body('LineaId')
		.notEmpty()
		.isInt({ min: 0 })
		.withMessage('ID de línea debe ser un número entero no negativo.'),
	body('CreadoPor')
		.notEmpty()
		.isInt({ min: 0 })
		.withMessage('El ID del creador debe ser un número entero no negativo.'),
];

export const updateAssetSchema = [
	body('ActivoId')
		.notEmpty()
		.isInt({ min: 0 })
		.withMessage('ID del activo debe ser un número entero no negativo.'),
	body('NombreActivo')
		.notEmpty()
		.isString()
		.trim()
		.withMessage(
			'Nombre del activo es requerido y debe ser una cadena de texto.',
		)
		.isLength({ min: 1, max: 255 })
		.withMessage('Nombre del activo debe tener entre 1 y 255 caracteres.'),
	body('Descripcion')
		.notEmpty()
		.isString()
		.trim()
		.withMessage(
			'Descripción del activo es requerida y debe ser una cadena de texto.',
		),
	body('Existencias')
		.notEmpty()
		.isInt({ min: 0 })
		.withMessage('Existencias debe ser un número entero no negativo.'),
	body('Precio')
		.notEmpty()
		.isNumeric({ min: 0 })
		.withMessage('Precio debe ser un número positivo.'),
	body('ImpuestoCompuestoId')
		.notEmpty()
		.isInt({ min: 0 })
		.withMessage(
			'ID de impuesto compuesto debe ser un número entero no negativo.',
		),
	body('LineaId')
		.notEmpty()
		.isInt({ min: 0 })
		.withMessage('ID de línea debe ser un número entero no negativo.'),
	body('ActualizadoPor')
		.notEmpty()
		.isInt({ min: 0 })
		.withMessage(
			'El campo ActualizadoPor debe ser un número entero no negativo.',
		),
];

export const disableAssetSchema = [
	body('ActivoId')
		.notEmpty()
		.isInt({ min: 0 })
		.withMessage('ID del activo debe ser un número entero no negativo.'),
	body('BorradoPor')
		.notEmpty()
		.isInt({ min: 0 })
		.withMessage('El campo BorradoPor debe ser un número entero no negativo.'),
];

export const setAssetSchema = [
	body('ActivoId')
		.notEmpty()
		.withMessage('El campo ActivoId no puede estar vacío')
		.isInt()
		.withMessage('El ActivoId debe ser un número entero'),
	body('CreadoPor')
		.notEmpty()
		.withMessage('El campo CreadoPor no puede estar vacío')
		.isInt()
		.withMessage('El CreadoPor debe ser un número entero'),
	body('items')
		.notEmpty()
		.withMessage('El campo items no puede estar vacío')
		.isArray()
		.withMessage('El campo items debe ser un array'),
	body('items.*.NumeroSerie')
		.notEmpty()
		.isString()
		.withMessage(
			'El campo NumeroSerie no puede estar vacío y debe ser un string',
		),
];

export const updateCodeAssetSchema = [
	body('ActivoSerieId')
		.notEmpty()
		.withMessage('El campo ActivoSerieId no puede estar vacío')
		.isInt()
		.withMessage('El ActivoSerieId debe ser un número entero'),
	body('ActivoId')
		.notEmpty()
		.withMessage('El campo ActivoId no puede estar vacío')
		.isInt()
		.withMessage('El ActivoId debe ser un número entero'),
	body('NumeroSerie')
		.notEmpty()
		.isString()
		.withMessage(
			'El campo NumeroSerie no puede estar vacío y debe ser un string',
		),
	body('ActualizadoPor')
		.notEmpty()
		.withMessage('El campo ActualizadoPor no puede estar vacío')
		.isInt()
		.withMessage('El ActualizadoPor debe ser un número entero'),
];
