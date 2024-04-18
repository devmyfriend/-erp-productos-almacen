import { body, param } from 'express-validator';

export const createGenProductSchema = [
	body('CodigoProducto')
		.notEmpty()
		.isString()
		.trim()
		.isLength({ min: 3 })
		.withMessage(
			'El Código del Producto es obligatorio y debe tener entre 3 y 20 caracteres.',
		),

	body('NombreProducto')
		.notEmpty()
		.isString()
		.trim()
		.isLength({ min: 5, max: 50 })
		.withMessage(
			'El campo NombreProducto es obligatorio y debe tener entre 5 y 50 caracteres.',
		),

	body('DescripcionProducto')
		.notEmpty()
		.isString()
		.trim()
		.isLength({ min: 5, max: 255 })
		.withMessage(
			'El campo DescripcionProducto es obligatorio y debe tener entre 5 y 255 caracteres.',
		),

	body('ClaveProductoServicio')
		.notEmpty()
		.isString()
		.trim()
		.isLength({ min: 2, max: 8 })
		.withMessage(
			'El campo ClaveProductoServicio es obligatorio y debe tener entre 2 y 8 caracteres.',
		),

	body('ClaveUnidadSat')
		.notEmpty()
		.isString()
		.trim()
		.isLength({ min: 2 })
		.withMessage(
			'El campo ClaveUnidadSat es obligatorio y debe tener 2 almenos caracteres.',
		),

	body('LineaId')
		.notEmpty()
		.isInt()
		.withMessage('El campo LineaId debe ser un numero entero  '),

	body('TipoProductoId')
		.notEmpty()
		.isInt()
		.withMessage('El campo TipoProductoId debe ser un numero entero  '),

	body('Puntos')
		.notEmpty()
		.isInt()
		.trim()
		.withMessage('El campo Puntos es requerido '),

	body('Serie')
		.notEmpty()
		.isBoolean()
		.withMessage('El campo Serie es requerido '),
	body('Venta')
		.notEmpty()
		.isBoolean()
		.withMessage('El campo Venta es requerido '),
	body('Insumo')
		.notEmpty()
		.isBoolean()
		.withMessage('El campo Insumo es requerido '),

	body('CreadoPor')
		.notEmpty()
		.isInt()
		.withMessage('El campo CreadoPor debe ser un número entero.'),
];

export const updateGenProductSchema = [
	param('id')
		.notEmpty()
		.isInt({ min: 1 })
		.withMessage('El ID del producto debe ser un número entero mayor que 0'),
	body('CodigoProducto')
		.notEmpty()
		.isString()
		.trim()
		.isLength({ min: 3 })
		.withMessage('gg'),
	body('NombreProducto')
		.notEmpty()
		.isString()
		.trim()
		.isLength({ min: 5, max: 50 })
		.withMessage(
			'El Nombre del Producto es obligatorio y debe tener entre 5 y 50 caracteres.',
		),
	body('DescripcionProducto')
		.notEmpty()
		.isString()
		.trim()
		.isLength({ min: 5, max: 255 })
		.withMessage(
			'La Descripción del Producto es obligatoria y debe tener entre 5 y 255 caracteres.',
		),
	body('ClaveProductoServicio')
		.notEmpty()
		.isString()
		.trim()
		.isLength({ min: 2, max: 8 })
		.withMessage(
			'La Clave del Producto/Servicio es obligatoria y debe tener entre 2 y 8 caracteres.',
		),
	body('ClaveUnidadSat')
		.notEmpty()
		.isString()
		.trim()
		.isLength({ min: 2 })
		.withMessage(
			'La Clave de Unidad SAT es obligatoria y debe tener al menos 2 caracteres.',
		),
	body('LineaId')
		.notEmpty()
		.isInt()
		.withMessage('El campo LineaId debe ser un número entero.'),
	body('TipoProductoId')
		.notEmpty()
		.isInt()
		.withMessage('El campo TipoProductoId debe ser un número entero.'),
	body('Puntos')
		.notEmpty()
		.isInt()
		.withMessage('El campo Puntos es requerido.'),
	body('Serie')
		.notEmpty()
		.isBoolean()
		.withMessage('El campo Serie es requerido.'),
	body('Venta')
		.notEmpty()
		.isBoolean()
		.withMessage('El campo Venta es requerido.'),
	body('Insumo')
		.notEmpty()
		.isBoolean()
		.withMessage('El campo Insumo es requerido.'),
	body('ActualizadoPor')
		.notEmpty()
		.isInt()
		.withMessage('El campo ActualizadoPor debe ser un número entero.'),
];

export const disableGenProductSchema = [
	body('ProductoId')
		.notEmpty()
		.isInt()
		.withMessage('El campo ProductoId debe ser un numero entero  '),

	body('BorradoPor')
		.notEmpty()
		.isInt()
		.withMessage('El campo BorradoPor debe ser un número entero.'),
];

export const enableGenProductSchema = [
	body('ProductoId')
		.notEmpty()
		.isInt()
		.withMessage('El campo ProductoId debe ser un numero entero  '),

	body('ActualizadoPor')
		.notEmpty()
		.isInt()
		.withMessage('El campo ActualizadoPor debe ser un número entero.'),
];
