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
