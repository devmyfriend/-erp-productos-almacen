import { body } from 'express-validator';

export const createMembershipSchema = [
	body('TipoMembresiaId')
		.notEmpty()
		.withMessage('El campo TipoMembresiaId no puede estar vacío.')
		.isInt()
		.withMessage('El campo TipoMembresiaId debe ser un número entero.'),

	body('NombreMembresia')
		.notEmpty()
		.withMessage('El campo NombreMembresia no puede estar vacío.')
		.isString()
		.withMessage('El campo NombreMembresia debe ser una cadena de caracteres.')
		.isLength({ min: 5 })
		.withMessage('El campo NombreMembresia debe tener al menos 5 caracteres.'),

	body('Descripcion')
		.notEmpty()
		.withMessage('El campo Descripcion no puede estar vacío.')
		.isString()
		.withMessage('El campo Descripcion debe ser una cadena de caracteres.')
		.isLength({ min: 5 })
		.withMessage('El campo Descripcion debe tener al menos 5 caracteres.'),

	body('Puntos')
		.notEmpty()
		.withMessage('El campo Puntos no puede estar vacío.')
		.isInt()
		.withMessage('El campo Puntos debe ser un número entero.'),

	body('ClaveProductoServicio')
		.notEmpty()
		.withMessage('El campo ClaveProductoServicio no puede estar vacío.')
		.isString()
		.withMessage(
			'El campo ClaveProductoServicio debe ser una cadena de caracteres.',
		),

	body('ClaveUnidadSat')
		.notEmpty()
		.withMessage('El campo ClaveUnidadSat no puede estar vacío.')
		.isString()
		.withMessage('El campo ClaveUnidadSat debe ser una cadena de caracteres.'),

	body('CreadoPor')
		.notEmpty()
		.withMessage('El campo CreadoPor no puede estar vacío.')
		.isInt()
		.withMessage('El campo CreadoPor debe ser un número entero.'),
];

export const updateMembershipSchema = [
	body('MembresiaId')
		.notEmpty()
		.withMessage('El campo MembresiaId no puede estar vacío.')
		.isInt()
		.withMessage('El campo MembresiaId debe ser un número entero.'),
	body('TipoMembresiaId')
		.notEmpty()
		.withMessage('El campo TipoMembresiaId no puede estar vacío.')
		.isInt()
		.withMessage('El campo TipoMembresiaId debe ser un número entero.'),

	body('NombreMembresia')
		.notEmpty()
		.withMessage('El campo NombreMembresia no puede estar vacío.')
		.isString()
		.withMessage('El campo NombreMembresia debe ser una cadena de caracteres.')
		.isLength({ min: 5 })
		.withMessage('El campo NombreMembresia debe tener al menos 5 caracteres.'),

	body('Descripcion')
		.notEmpty()
		.withMessage('El campo Descripcion no puede estar vacío.')
		.isString()
		.withMessage('El campo Descripcion debe ser una cadena de caracteres.')
		.isLength({ min: 5 })
		.withMessage('El campo Descripcion debe tener al menos 5 caracteres.'),

	body('Puntos')
		.notEmpty()
		.withMessage('El campo Puntos no puede estar vacío.')
		.isInt()
		.withMessage('El campo Puntos debe ser un número entero.'),

	body('ClaveProductoServicio')
		.notEmpty()
		.withMessage('El campo ClaveProductoServicio no puede estar vacío.')
		.isString()
		.withMessage(
			'El campo ClaveProductoServicio debe ser una cadena de caracteres.',
		),

	body('ClaveUnidadSat')
		.notEmpty()
		.withMessage('El campo ClaveUnidadSat no puede estar vacío.')
		.isString()
		.withMessage('El campo ClaveUnidadSat debe ser una cadena de caracteres.'),

	body('ActualizadoPor')
		.notEmpty()
		.withMessage('El campo ActualizadoPor no puede estar vacío.')
		.isInt()
		.withMessage('El campo ActualizadoPor debe ser un número entero.'),
];

export const disableMembershipSchema = [
	body('MembresiaId')
		.notEmpty()
		.withMessage('El campo MembresiaId no puede estar vacío.')
		.isInt()
		.withMessage('El campo MembresiaId debe ser un número entero.'),

	body('BorradoPor')
		.notEmpty()
		.isInt()
		.withMessage('El campo BorradoPor debe ser un número entero.'),
];

export const enableMembershipSchema = [
	body('MembresiaId')
		.notEmpty()
		.withMessage('El campo MembresiaId no puede estar vacío.')
		.isInt()
		.withMessage('El campo MembresiaId debe ser un número entero.'),

	body('ActualizadoPor')
		.notEmpty()
		.isInt()
		.withMessage('El campo ActualizadoPor debe ser un número entero.'),
];

export const createTypeMembershipSchema = [
	body('TipoPeriodoId')
		.notEmpty()
		.withMessage('El campo TipoPeriodoId no puede estar vacío.')
		.isInt({ min: 1 })
		.withMessage('El campo TipoPeriodoId debe ser un número entero positivo.'),

	body('NombreTipoMembresia')
		.notEmpty()
		.withMessage('El campo NombreTipoMembresia no puede estar vacío.')
		.isString()
		.withMessage(
			'El campo NombreTipoMembresia debe ser una cadena de caracteres.',
		)
		.isLength({ max: 100 })
		.withMessage(
			'El campo NombreTipoMembresia debe tener máximo 100 caracteres.',
		),

	body('Cita')
		.notEmpty()
		.withMessage('El campo Cita no puede estar vacío.')
		.isBoolean()
		.withMessage('El campo Cita debe ser un booleano.'),

	body('CreadoPor')
		.notEmpty()
		.withMessage('El campo CreadoPor no puede estar vacío.')
		.isInt({ min: 1 })
		.withMessage('El campo CreadoPor debe ser un número entero positivo.'),

	body('MinimoAsociados')
		.notEmpty()
		.withMessage('El campo MinimoAsociados no puede estar vacío.')
		.isInt({ min: 1 })
		.withMessage(
			'El campo MinimoAsociados debe ser un número entero positivo.',
		),
];

export const updateTypeMembershipSchema = [
	body('TipoMembresiaId')
		.notEmpty()
		.withMessage('El campo TipoMembresiaId no puede estar vacío.')
		.isInt({ min: 1 })
		.withMessage(
			'El campo TipoMembresiaId debe ser un número entero positivo.',
		),
	body('TipoPeriodoId')
		.notEmpty()
		.withMessage('El campo TipoPeriodoId no puede estar vacío.')
		.isInt({ min: 1 })
		.withMessage('El campo TipoPeriodoId debe ser un número entero positivo.'),

	body('NombreTipoMembresia')
		.notEmpty()
		.withMessage('El campo NombreTipoMembresia no puede estar vacío.')
		.isString()
		.withMessage(
			'El campo NombreTipoMembresia debe ser una cadena de caracteres.',
		)
		.isLength({ max: 100 })
		.withMessage(
			'El campo NombreTipoMembresia debe tener máximo 100 caracteres.',
		),

	body('Cita')
		.notEmpty()
		.withMessage('El campo Cita no puede estar vacío.')
		.isBoolean()
		.withMessage('El campo Cita debe ser un booleano.'),

	body('ActualizadoPor')
		.notEmpty()
		.withMessage('El campo CreadoPor no puede estar vacío.')
		.isInt({ min: 1 })
		.withMessage('El campo CreadoPor debe ser un número entero positivo.'),

	body('MinimoAsociados')
		.notEmpty()
		.withMessage('El campo MinimoAsociados no puede estar vacío.')
		.isInt({ min: 1 })
		.withMessage(
			'El campo MinimoAsociados debe ser un número entero positivo.',
		),
];

export const disableTypeMembershipSchema = [
	body('TipoMembresiaId')
		.notEmpty()
		.withMessage('El campo TipoMembresiaId no puede estar vacío.')
		.isInt()
		.withMessage('El campo TipoMembresiaId debe ser un número entero.'),

	body('BorradoPor')
		.notEmpty()
		.isInt()
		.withMessage('El campo BorradoPor debe ser un número entero.'),
];
