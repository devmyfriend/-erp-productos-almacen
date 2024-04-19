import {
	findAllTypeProductById,
	findTypeProductById,
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

const update = async (req, res) => {
	try {
		const data = req.body;

		const typeId = req.params.id;

		const userFound = await findUserById(data.ActualizadoPor);
		const typeFound = await findTypeProductById(typeId);
		const nameTypeFound = await findTypeProductByName(data.NombreTipoProducto);

		if (!userFound.exist) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}

		if (!typeFound.exist) {
			return res.status(404).json({ error: 'El tipo de producto no existe' });
		}

		if (nameTypeFound.exist) {
			return res.status(409).json({
				error: `El nombre '${data.NombreTipoProducto}' ya está en uso`,
			});
		}

		await TypeProductModel.update(
			Object.assign(data, {
				ActualizadoPor: data.ActualizadoPor,
				ActualizadoEn: new Date(),
			}),
			{
				where: {
					TipoProductoId: typeId,
				},
			},
		);

		return res.status(200).json({
			message: 'Se ha editado el tipo de producto',
		});
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
		const userFound = await findUserById(data.BorradoPor);
		const typeFound = await findTypeProductById(data.TipoProductoId);

		if (!userFound.exist) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}

		if (!typeFound.exist) {
			return res.status(404).json({ error: 'El tipo de producto no existe' });
		}

		await TypeProductModel.update(
			Object.assign(data, {
				BorradoEn: new Date(),
				Borrado: true,
			}),
			{
				where: {
					TipoProductoId: data.TipoProductoId,
				},
			},
		);

		return res.status(200).json({ message: 'Producto eliminado' });
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
		const userFound = await findUserById(data.ActualizadoPor);
		const typeFound = await findAllTypeProductById(data.TipoProductoId);

		if (!userFound.exist) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}

		if (!typeFound.exist) {
			return res.status(404).json({ error: 'El tipo de producto no existe' });
		}

		await TypeProductModel.update(
			Object.assign(data, {
				ActualizadoPor: data.ActualizadoPor,
				ActualizadoEn: new Date(),
				BorradoEn: null,
				Borrado: false,
			}),
			{
				where: {
					TipoProductoId: data.TipoProductoId,
				},
			},
		);

		return res.status(200).json({ message: 'Producto activado' });
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
