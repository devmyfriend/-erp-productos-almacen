import {
	findAllMembershipById,
	findMembershipById,
	findMembershipByName,
	findTypeMembershipById,
	findTypeMembershipByName,
	findTypeScheduleById,
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

const findById = async (req, res) => {
	try {
		const id = req.params.id;
		const data = await MembershipModel.findOne({
			attributes: [
				'MembresiaId',
				'TipoMembresiaId',
				'NombreMembresia',
				'Descripcion',
				'Puntos',
				'ClaveUnidadsat',
				'ClaveProdcutoServicio',
			],

			where: { MembresiaId: id },
		});

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
			attributes: ['TipoPeriodoId', 'PeriodoNombre'],
			where: {
				TipoPeriodoId: type.dataValues.TipoPeriodoId,
			},
		});

		return res.status(200).json({ response: data, type, typeSchedule });
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

export const disable = async (req, res) => {
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

export const enable = async (req, res) => {
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

export const methods = {
	findAll,
	findById,
	create,
	update,
	disable,
	enable,
	findAllType,
	createType,
};
