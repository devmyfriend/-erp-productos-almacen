import { where } from 'sequelize';
import {
	findAccesById,
	findAccesByName,
	findUserById,
} from '../middlewares/finders/index.js';
import { AccessModel } from '../models/index.js';

const findAll = async (req, res) => {
	try {
		const data = await AccessModel.findAll({
			attributes: [
				'AccesoId',
				'NombreAcceso',
				'Horario',
				'Completo',
				'CreadoEn',
			],
			order: [['AccesoId', 'DESC']],
		});

		return res.status(200).json({ response: data });
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

		console.log(data);
		const nameFound = await findAccesByName(data.NombreAcceso);
		const userFound = await findUserById(data.CreadoPor);

		if (nameFound.exist) {
			return res.status(409).json({ error: 'El nombre ya está en uso' });
		}

		if (!userFound.exist) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}

		const newData = await AccessModel.create(data);
		return res.status(200).json({
			message: 'Se ha creado el acceso',
			AccesoId: newData.dataValues.AccesoId,
		});
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

		const dataFound = await findAccesById(data.AccesoId);
		const userFound = await findUserById(data.ActualizadoPor);
		const nameFound = await findAccesByName(data.NombreAcceso);

		if (!dataFound.exist) {
			return res.status(404).json({ error: 'Acceso no encontrado' });
		}

		if (!userFound.exist) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}
		if (nameFound.exist && nameFound.data.AccesoId != data.AccesoId) {
			return res.status(409).json({ error: 'El nombre ya está en uso' });
		}

		const newData = await AccessModel.update(
			Object.assign(data, { ActualizadoEn: new Date() }),
			{ where: { AccesoId: data.AccesoId } },
		);

		return res.status(200).json({
			message: 'Se ha editado el registro',
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error: 'Error interno del servidor',
		});
	}
};

export const methods = {
	findAll,
	create,
	update,
};
