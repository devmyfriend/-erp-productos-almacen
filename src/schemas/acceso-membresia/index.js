import { body } from 'express-validator';

export const createMembershipAccesSchema = [
	body('NombreAcceso')
		.notEmpty()
		.withMessage('El campo NombreAcceso no puede estar vacío.')
		.isString()
		.withMessage('El campo NombreAcceso debe ser una cadena de caracteres.')
		.isLength({ min: 5 })
		.withMessage('El campo NombreAcceso debe tener al menos 5 caracteres.'),

	body('Completo')
		.notEmpty()
		.withMessage('El campo Completo no puede estar vacío.')
		.isBoolean()
		.withMessage('El campo Completo debe ser un valor booleano.'),

	body('CreadoPor')
		.notEmpty()
		.withMessage('El campo CreadoPor no puede estar vacío.')
		.isInt()
		.withMessage('El campo CreadoPor debe ser un número entero.'),
];

export const updateMembershipAccesSchema = [
	body('AccesoId')
		.notEmpty()
		.withMessage('El campo AccesoId no puede estar vacío.')
		.isInt()
		.withMessage('El campo AccesoId debe ser un número entero.'),
	body('NombreAcceso')
		.notEmpty()
		.withMessage('El campo NombreAcceso no puede estar vacío.')
		.isString()
		.withMessage('El campo NombreAcceso debe ser una cadena de caracteres.')
		.isLength({ min: 5 })
		.withMessage('El campo NombreAcceso debe tener al menos 5 caracteres.'),

	body('Completo')
		.notEmpty()
		.withMessage('El campo Completo no puede estar vacío.')
		.isBoolean()
		.withMessage('El campo Completo debe ser un valor booleano.'),

	body('ActualizadoPor')
		.notEmpty()
		.withMessage('El campo ActualizadoPor no puede estar vacío.')
		.isInt()
		.withMessage('El campo ActualizadoPor debe ser un número entero.'),
];

export const disableMembershipAccesSchema = [
	body('AccesoId')
		.notEmpty()
		.withMessage('El campo AccesoId no puede estar vacío.')
		.isInt()
		.withMessage('El campo AccesoId debe ser un número entero.'),

	body('BorradoPor')
		.notEmpty()
		.isInt()
		.withMessage('El campo BorradoPor debe ser un número entero.'),
];

export const addAccessSchema = [
	body('MembresiaId')
		.isInt()
		.withMessage('El campo MembresiaId debe ser un entero'),
	body('CreadoPor')
		.isInt()
		.withMessage('El campo CreadoPor debe ser un entero'),
	body('Accesos').isArray().withMessage('El campo AccesoId debe ser un array'),
	body('Accesos.*.AccesoId')
		.isInt()
		.withMessage('Los elementos del campo AccesoId deben ser enteros'),
];
