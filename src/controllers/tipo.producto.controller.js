import {
	findTypeProductByName,
	findUserById,
} from '../middlewares/finders/index.js';
import { TypeProductModel } from '../models/index.js';

const findAll = async (req, res) => {
	try {
		const data = await TypeProductModel.findAll({
			attributes: [
				'TipoProductoId',
				'NombreTipoProducto',
				'DescripcionTipoProducto',
				'CreadoEn',
			],

			where: {
				Borrado: 0,
			},

			order: [['TipoProductoId', 'desc']],

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
		const typeFound = await findTypeProductByName(data.NombreTipoProducto);

		if (!userFound.exist) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}

		if (typeFound.exist) {
			return res.status(409).json({
				error: `El nombre '${data.NombreTipoProducto}' ya está en uso`,
			});
		}

		const newData = await TypeProductModel.create(data);

		return res.status(200).json({
			message: 'Se ha creado el tipo de producto',
			TipoProductoId: newData.dataValues.TipoProductoId,
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
};
