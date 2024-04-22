import { Connection as sequelize } from '../database/mariadb.database.js';
import { ServiceModel } from '../models/servicio.model.js';

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

const create = (req, res) => {
	try {
		console.log(req.body);

		return res.status(200).json({ response: 'hello' });
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
};
