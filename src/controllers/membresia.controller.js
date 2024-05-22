import { Op, Sequelize } from 'sequelize';
import { Connection as conn } from '../database/mariadb.database.js';
import {
	findAllMembershipById,
	findMembershipById,
	findMembershipByName,
	findTypeMembershipById,
	findTypeMembershipByName,
	findTypeScheduleById,
	findTypeScheduleByName,
	findUserById,
} from '../middlewares/finders/index.js';
import {
	MembershipModel,
	TypeMembershipModel,
	TypeScheduleModel,
} from '../models/index.js';

const findAll = async (req, res) => {
	try {
		const data = await MembershipModel.findAll({
			attributes: [
				'MembresiaId',
				'TipoMembresiaId',
				'NombreMembresia',
				'Horario',
				'Descripcion',
				'Puntos',
				'ClaveUnidadsat',
				'ClaveProdcutoServicio',
			],
			where: {
				Borrado: false,
			},
		});

		return res.status(200).json({ response: data });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error: 'Error interno del servidor',
		});
	}
};

const findByName = async (req, res) => {
	try {
		const name = req.params.id;
		const data = await MembershipModel.findAll({
			attributes: [
				'MembresiaId',
				'TipoMembresiaId',
				'NombreMembresia',
				'Horario',
				'Descripcion',
				'Puntos',
				'ClaveUnidadsat',
				'ClaveProdcutoServicio',
			],
			where: Sequelize.where(
				Sequelize.fn('lower', Sequelize.col('NombreMembresia')),
				{
					[Op.like]: `%${name.toLowerCase()}%`,
				},
			),
			Borrado: false,
		});

		return res.status(200).json({ response: data });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error: 'Error interno del servidor',
		});
	}
};

const findById = async (req, res) => {
	try {
		const id = req.params.id;
		const data = await MembershipModel.findOne({
			attributes: [
				'MembresiaId',
				'TipoMembresiaId',
				'NombreMembresia',
				'Horario',
				'Descripcion',
				'Puntos',
				'ClaveUnidadsat',
				'ClaveProdcutoServicio',
			],

			where: { MembresiaId: id },
		});

		if (!data) {
			return res.status(404).json({ error: 'No hay datos disponibles' });
		}

		const type = await TypeMembershipModel.findOne({
			attributes: [
				'TipoMembresiaId',
				'TipoPeriodoId',
				'NombreTipoMembresia',
				'Cita',
				'MinimoAsociados',
			],
			where: { TipoMembresiaId: data.dataValues.TipoMembresiaId },
		});

		const typeSchedule = await TypeScheduleModel.findOne({
			attributes: ['TipoPeriodoId', 'NombrePeriodo'],
			where: {
				TipoPeriodoId: type.dataValues.TipoPeriodoId,
			},
		});

		const access = await conn.query('CALL sp_acceso_membresia(6)');

		return res.status(200).json({
			response: {
				...data.dataValues,
				...typeSchedule.dataValues,
				...type.dataValues,
			},
			access,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error: 'Error interno del servidor',
		});
	}
};

const create = async (req, res) => {
	try {
		const data = req.body;
		const userFound = await findUserById(data.CreadoPor);
		const nameFound = await findMembershipByName(data.NombreMembresia);
		const typeFound = await findTypeMembershipById(data.TipoMembresiaId);

		if (!userFound.exist) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}
		if (nameFound.exist) {
			return res
				.status(409)
				.json({ error: 'El nombre de la membresia ya esta en uso' });
		}

		if (!typeFound.exist) {
			return res.status(404).json({ error: 'El tipo de membresia no existe' });
		}

		await MembershipModel.create(data);

		return res.status(200).json({ message: 'Se ha creado la Membresia' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error: 'Error interno del servidor',
		});
	}
};

const update = async (req, res) => {
	try {
		const data = req.body;
		const membershipFound = await findMembershipById(data.MembresiaId);
		const userFound = await findUserById(data.ActualizadoPor);
		const nameFound = await findMembershipByName(data.NombreMembresia);
		const typeFound = await findTypeMembershipById(data.TipoMembresiaId);

		if (!userFound.exist) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}

		if (!membershipFound.exist) {
			return res.status(404).json({ error: 'La membresia no existe' });
		}
		if (nameFound.exist && data.MembresiaId != nameFound.data.MembresiaId) {
			return res
				.status(409)
				.json({ error: 'El nombre de la membresia ya esta en uso' });
		}

		if (!typeFound.exist) {
			return res.status(404).json({ error: 'El tipo de membresia no existe' });
		}

		await MembershipModel.update(
			Object.assign(data, {
				ActualizadoEn: new Date(),
			}),
			{
				where: {
					MembresiaId: data.MembresiaId,
				},
			},
		);

		return res.status(200).json({ message: 'Se ha editado la Membresia' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error: 'Error interno del servidor',
		});
	}
};

const disable = async (req, res) => {
	try {
		const data = req.body;
		const membershipFound = await findMembershipById(data.MembresiaId);
		const userFound = await findUserById(data.BorradoPor);
		if (!userFound.exist) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}

		if (!membershipFound.exist) {
			return res.status(404).json({ error: 'La membresia no existe' });
		}
		await MembershipModel.update(
			Object.assign(data, {
				Borrado: true,
				BorradoEn: new Date(),
			}),
			{
				where: {
					MembresiaId: data.MembresiaId,
				},
			},
		);

		return res.status(200).json({ message: 'Membresia eliminada' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error: 'Error interno del servidor',
		});
	}
};

const enable = async (req, res) => {
	try {
		const data = req.body;
		const membershipFound = await findAllMembershipById(data.MembresiaId);
		const userFound = await findUserById(data.ActualizadoPor);
		if (!userFound.exist) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}

		if (!membershipFound.exist) {
			return res.status(404).json({ error: 'La membresia no existe' });
		}
		await MembershipModel.update(
			Object.assign(data, {
				ActualizadoEn: new Date(),
				Borrado: false,
				BorradoEn: null,
			}),
			{
				where: {
					MembresiaId: data.MembresiaId,
				},
			},
		);

		return res.status(200).json({ message: 'Membresia activada' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error: 'Error interno del servidor',
		});
	}
};

const findAllType = async (req, res) => {
	try {
		const data = await TypeMembershipModel.findAll({
			attributes: [
				'TipoMembresiaId',
				'TipoPeriodoId',
				'NombreTipoMembresia',
				'Cita',
				'MinimoAsociados',
			],
			where: {
				Borrado: false,
			},
		});

		return res.status(200).json({ response: data });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error: 'Error interno del servidor',
		});
	}
};

const findTypeByName = async (req, res) => {
	try {
		const name = req.params.id;
		const data = await TypeMembershipModel.findAll({
			attributes: [
				'TipoMembresiaId',
				'TipoPeriodoId',
				'NombreTipoMembresia',
				'Cita',
				'MinimoAsociados',
			],
			where: Sequelize.where(
				Sequelize.fn('lower', Sequelize.col('NombreTipoMembresia')),
				{
					[Op.like]: `%${name.toLowerCase()}%`,
				},
			),
		});

		return res.status(200).json({ response: data });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error: 'Error interno del servidor',
		});
	}
};

const createType = async (req, res) => {
	try {
		const data = req.body;
		const userFound = await findUserById(data.CreadoPor);
		const dataFound = await findTypeMembershipByName(data.NombreTipoMembresia);
		const typeScheduleFound = await findTypeScheduleById(data.TipoPeriodoId);

		if (!userFound.exist) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}

		if (!typeScheduleFound.exist) {
			return res.status(404).json({ error: 'Periodo no encontrado' });
		}

		if (dataFound.exist) {
			return res
				.status(409)
				.json({ error: 'El nombre del tipo de membresia ya esta en uso' });
		}

		await TypeMembershipModel.create(data);

		return res.status(200).json({ message: 'Se ha creado el registro' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error: 'Error interno del servidor',
		});
	}
};

const updatetype = async (req, res) => {
	try {
		const data = req.body;

		const userFound = await findUserById(data.ActualizadoPor);
		const typeFound = await findTypeMembershipById(data.TipoMembresiaId);
		const dataFound = await findTypeMembershipByName(data.NombreTipoMembresia);
		const typeScheduleFound = await findTypeScheduleById(data.TipoPeriodoId);

		if (!userFound.exist) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}

		if (!typeFound.exist) {
			return res
				.status(404)
				.json({ error: 'No se ha encontrado el tipo de mebresia' });
		}

		if (!typeScheduleFound.exist) {
			return res.status(404).json({ error: 'Periodo no encontrado' });
		}

		if (
			dataFound.exist &&
			dataFound.data.TipoMembresiaId != data.TipoMembresiaId
		) {
			return res
				.status(409)
				.json({ error: 'El nombre del tipo de membresia ya esta en uso' });
		}

		await TypeMembershipModel.update(
			Object.assign(data, {
				ActualizadoEn: new Date(),
			}),
			{
				where: {
					TipoMembresiaId: data.TipoMembresiaId,
				},
			},
		);

		return res.status(200).json({ message: 'Se ha editado el registro' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error: 'Error interno del servidor',
		});
	}
};

const disableType = async (req, res) => {
	try {
		const data = req.body;
		const typeFound = await findTypeMembershipById(data.TipoMembresiaId);
		const userFound = await findUserById(data.BorradoPor);
		if (!userFound.exist) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}

		if (!typeFound.exist) {
			return res.status(404).json({ error: 'El tipo de membresia no existe' });
		}
		await TypeMembershipModel.update(
			Object.assign(data, {
				Borrado: true,
				BorradoEn: new Date(),
			}),
			{
				where: {
					TipoMembresiaId: data.TipoMembresiaId,
				},
			},
		);

		return res.status(200).json({ message: 'Registro eliminado' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error: 'Error interno del servidor',
		});
	}
};

const findAllTypeSchedule = async (req, res) => {
	try {
		const data = await TypeScheduleModel.findAll({
			attributes: ['TipoPeriodoId', 'NombrePeriodo', 'Borrado'],
		});

		return res.status(200).json({ response: data });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error: 'Error interno del servidor',
		});
	}
};

const findAllTypeScheduleByname = async (req, res) => {
	try {
		const name = req.params.id;
		const data = await TypeScheduleModel.findAll({
			attributes: ['TipoPeriodoId', 'NombrePeriodo', 'Borrado'],
			where: Sequelize.where(
				Sequelize.fn('lower', Sequelize.col('NombrePeriodo')),
				{
					[Op.like]: `%${name.toLowerCase()}%`,
				},
			),
		});

		return res.status(200).json({ response: data });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error: 'Error interno del servidor',
		});
	}
};

const createTypeSchedule = async (req, res) => {
	try {
		const data = req.body;
		const userFound = await findUserById(data.CreadoPor);
		const typeFound = await findTypeScheduleByName(data.NombrePeriodo);

		if (!userFound.exist) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}
		if (typeFound.exist) {
			return res.status(404).json({ error: 'El nombre ya está en uso' });
		}

		await TypeScheduleModel.create(data);

		return res.status(200).json({ message: 'Se ha creado el periodo' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error: 'Error interno del servidor',
		});
	}
};

const updateTypeSchedule = async (req, res) => {
	try {
		const data = req.body;
		const typeScheduleFound = await findTypeScheduleById(data.TipoPeriodoId);
		const userFound = await findUserById(data.ActualizadoPor);
		const typeNameFound = await findTypeScheduleByName(data.NombrePeriodo);

		if (!typeScheduleFound.exist) {
			return res.status(404).json({ error: 'Periodo no encontrado' });
		}
		if (!userFound.exist) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}
		if (
			typeNameFound.exist &&
			typeNameFound.data.TipoPeriodoId != data.TipoPeriodoId
		) {
			return res.status(404).json({ error: 'El nombre ya está en uso' });
		}

		await TypeScheduleModel.update(
			Object.assign(data, { ActualizadoEn: new Date() }),
			{
				where: {
					TipoPeriodoId: data.TipoPeriodoId,
				},
			},
		);

		return res.status(200).json({ message: 'Se ha editado el registro' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error: 'Error interno del servidor',
		});
	}
};

const disableTypeSchedule = async (req, res) => {
	try {
		const data = req.body;
		const typeScheduleFound = await findTypeScheduleById(data.TipoPeriodoId);
		const userFound = await findUserById(data.BorradoPor);

		if (!typeScheduleFound.exist) {
			return res.status(404).json({ error: 'Periodo no encontrado' });
		}
		if (!userFound.exist) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}

		await TypeScheduleModel.update(
			Object.assign(data, { Borrado: true, BorradoEn: new Date() }),
			{
				where: {
					TipoPeriodoId: data.TipoPeriodoId,
				},
			},
		);

		return res.status(200).json({ message: 'Se ha borrado el registro' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error: 'Error interno del servidor',
		});
	}
};

export const methods = {
	findAll,
	findByName,
	findById,
	create,
	update,
	disable,
	enable,
	findAllType,
	findTypeByName,
	createType,
	updatetype,
	disableType,
	findAllTypeSchedule,
	findAllTypeScheduleByname,
	createTypeSchedule,
	updateTypeSchedule,
	disableTypeSchedule,
};
