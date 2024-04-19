import { TypeProductModel } from '../models/tipo.producto.model.js';

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





export const methods = {
	findAll,
};
