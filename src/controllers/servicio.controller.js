import { where } from 'sequelize';
import { Connection as sequelize } from '../database/mariadb.database.js';
import {
	findAllServiceById,
	findServiceById,
	findServiceByName,
	findtypeServiceById,
	findUserById,
} from '../middlewares/finders/index.js';
import { ServiceModel } from '../models/index.js';

const findAll = async (req, res) => {
	try {
		const data = await ServiceModel.findAll({
			attributes: [
				'ServicioId',
				'TipoServicioId',
				'NombreServicio',
				'ClaveProductoServicio',
				'ImpuestoCompuestoId',
				'Cita',
				'FechaUltimaVenta',
			],
			where: {
				Borrado: 0,
			},

			order: [['ServicioId', 'desc']],

			limit: 10,
		});

		if (data.length < 1) {
			return res.status(404).json({ error: 'No hay datos disponibles' });
		}

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
		const userFound = await findUserById(data.CreadoPor);
		const typeServicefound = await findtypeServiceById(data.TipoServicioId);
		const serviceFound = await findServiceByName(data.NombreServicio);

		if (!userFound.exist) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}

		if (!typeServicefound.exist) {
			return res.status(404).json({ error: 'El tipo de servicio no existe' });
		}

		if (serviceFound.exist) {
			return res
				.status(409)
				.json({ error: 'El nombre del servicio ya está en uso' });
		}

		await ServiceModel.create(data);

		return res.status(200).json({ message: 'Se ha creado el servicio' });
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
		const userFound = await findUserById(data.ActualizadoPor);
		const serviceFound = await findServiceById(data.ServicioId);
		const typeServicefound = await findtypeServiceById(data.TipoServicioId);
		const serviceNameFound = await findServiceByName(data.NombreServicio);

		if (!userFound.exist) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}

		if (!typeServicefound.exist) {
			return res.status(404).json({ error: 'El tipo de servicio no existe' });
		}

		if (!serviceFound.exist) {
			return res.status(404).json({ error: 'El servicio no existe' });
		}
		if (
			serviceNameFound.exist &&
			serviceNameFound.data.ServicioId != data.ServicioId
		) {
			return res
				.status(409)
				.json({ error: 'El nombre del servicio ya está en uso' });
		}

		await ServiceModel.update(
			Object.assign(data, {
				ActualizadoPor: data.ActualizadoPor,
				ActualizadoEn: new Date(),
			}),
			{
				where: {
					ServicioId: data.ServicioId,
				},
			},
		);

		return res.status(200).json({ message: 'Se ha editado el servicio' });
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

		const userFound = await findUserById(data.BorradoPor);
		const serviceFound = await findServiceById(data.ServicioId);

		if (!userFound.exist) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}

		if (!serviceFound.exist) {
			return res.status(404).json({ error: 'El servicio no existe' });
		}

		await ServiceModel.update(
			Object.assign(data, {
				BorradoEn: new Date(),
				Borrado: true,
			}),
			{
				where: {
					ServicioId: data.ServicioId,
				},
			},
		);

		return res.status(200).json({ message: 'Servicio eliminado' });
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

		const userFound = await findUserById(data.ActualizadoPor);
		const serviceFound = await findAllServiceById(data.ServicioId);

		if (!userFound.exist) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}

		if (!serviceFound.exist) {
			return res.status(404).json({ error: 'El servicio no existe' });
		}

		await ServiceModel.update(
			Object.assign(data, {
				BorradoEn: null,
				Borrado: false,
				ActualizadoEn: new Date(),
			}),
			{
				where: {
					ServicioId: data.ServicioId,
				},
			},
		);

		return res.status(200).json({ message: 'Servicio activado' });
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
	disable,
	enable,
};
