import {
	findAllProductById,
	findLineById,
	findProductByCode,
	findProductById,
	findTypeProductById,
	findUserById,
} from '../middlewares/finders/index.js';

import { Connection as sequelize } from '../database/mariadb.database.js';
import { GenProductModel } from '../models/producto.gral.model.js';

const findAll = async (req, res) => {
	try {
		const data = await sequelize.query('CALL sp_admon_productos(1, NULL) ');

		console.log(data);

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

const findByName = async (req, res) => {
	try {
		const name = req.params.id;

		const data = await sequelize.query('CALL sp_admon_productos(?, ?)', {
			replacements: [3, name.toLowerCase()],
			type: sequelize.QueryTypes.RAW,
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

const findById = async (req, res) => {
	try {
		const productCode = req.params.id;

		const data = await sequelize.query('CALL sp_admon_productos(?, ?)', {
			replacements: [2, productCode],
			type: sequelize.QueryTypes.RAW,
		});

		if (data.length < 1) {
			return res.status(404).json({ error: 'No se ha encontrado producto' });
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

		const lineFound = await findLineById(data.LineaId);

		const typeFound = await findTypeProductById(data.TipoProductoId);

		const codeFound = await findProductByCode(data.CodigoProducto);

		if (!userFound.exist) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}

		if (!lineFound.exist) {
			return res.status(404).json({ error: 'La linea no existe' });
		}

		if (!typeFound.exist) {
			return res.status(404).json({ error: 'El tipo de producto no existe' });
		}

		if (codeFound.exist) {
			return res
				.status(409)
				.json({ error: 'El Codigo de producto ya está enuso' });
		}

		const newData = await GenProductModel.create(data);

		return res.status(200).json({
			message: 'Se ha creado el producto',
			ProductoId: newData.dataValues.ProductoId,
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
		const productId = req.params.id;

		const productFound = await findProductById(productId);

		const codeFound = await findProductByCode(data.CodigoProducto);

		const userFound = await findUserById(data.ActualizadoPor);

		const lineFound = await findLineById(data.LineaId);

		const typeFound = await findTypeProductById(data.TipoProductoId);

		if (!productFound.exist) {
			return res.status(404).json({ error: 'El producto no existe' });
		}

		if (codeFound.exist && codeFound.data.ProductoId != productId) {
			return res
				.status(409)
				.json({ error: 'El Codigo del producto ya está enuso' });
		}

		if (!userFound.exist) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}

		if (!lineFound.exist) {
			return res.status(404).json({ error: 'La linea no existe' });
		}

		if (!typeFound.exist) {
			return res.status(404).json({ error: 'El tipo de producto no existe' });
		}

		await GenProductModel.update(
			Object.assign(data, {
				ActualizadoPor: data.ActualizadoPor,
				ActualizadoEn: new Date(),
			}),
			{
				where: {
					ProductoId: productId,
				},
			},
		);

		return res.status(200).json({
			message: 'Se ha editado el producto',
		});
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
		const productFound = await findProductById(data.ProductoId);
		const userFound = await findUserById(data.BorradoPor);

		if (!userFound.exist) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}
		if (!productFound.exist) {
			return res.status(404).json({ error: 'El producto no existe' });
		}

		await GenProductModel.update(
			Object.assign(data, {
				BorradoEn: new Date(),
				Borrado: true,
			}),
			{
				where: {
					ProductoId: data.ProductoId,
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
		const productFound = await findAllProductById(data.ProductoId);
		const userFound = await findUserById(data.ActualizadoPor);

		if (!userFound.exist) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}
		if (!productFound.exist) {
			return res.status(404).json({ error: 'El producto no existe' });
		}

		await GenProductModel.update(
			Object.assign(data, {
				ActualizadoEn: new Date(),
				BorradoEn: null,
				Borrado: false,
			}),
			{
				where: {
					ProductoId: data.ProductoId,
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
	findByName,
	create,
	findById,
	update,
	disable,
	enable,
};
