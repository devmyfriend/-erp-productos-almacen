import { AssetModel, CodeAssetModel } from '../models/index.js';
import { Connection as conn } from '../database/mariadb.database.js';
import {
	findAllAssetById,
	findAllAssetByName,
	findAssetByCode,
	findAssetById,
	findLineById,
	findUserById,
} from '../middlewares/finders/index.js';
import { Op, Sequelize } from 'sequelize';

const findAll = async (req, res) => {
	try {
		const data = await AssetModel.findAll({
			attributes: [
				'ActivoId',
				'NombreActivo',
				'ImpuestoCompuestoId',
				'LineaId',
				'Borrado',
			],
			order: [['ActivoId', 'DESC']],
		});

		return res.status(200).json({ response: data });
	} catch (error) {
		console.log(error.message);

		return res.status(500).json({ error: 'Error interno del servidor' });
	}
};

const findById = async (req, res) => {
	try {
		const idAsset = req.params.id;

		const dataFound = await findAllAssetById(idAsset);

		if (!dataFound.exist) {
			return res.status(404).json({ error: 'No hay datos disponibles' });
		}

		const data = await conn.query('CALL sp_activos_detalle(?,?)', {
			replacements: [1, idAsset],
		});

		const detail = await conn.query('CALL sp_activos_detalle(?,?)', {
			replacements: [2, idAsset],
		});

		return res
			.status(200)
			.json({ response: { ...data[0], ...{ stock: detail } } });
	} catch (error) {
		console.log(error.message);

		return res.status(500).json({ error: 'Error interno del servidor' });
	}
};

const findByName = async (req, res) => {
	try {
		const name = req.params.id;

		const data = await AssetModel.findAll({
			attributes: [
				'ActivoId',
				'NombreActivo',
				'ImpuestoCompuestoId',
				'LineaId',
				'Borrado',
			],
			where: Sequelize.where(
				Sequelize.fn('lower', Sequelize.col('NombreActivo')),
				{
					[Op.like]: `%${name.toLowerCase()}%`,
				},
			),
			order: [['ActivoId', 'DESC']],
		});

		return res.status(200).json({ response: data });
	} catch (error) {
		console.log(error.message);

		return res.status(500).json({ error: 'Error interno del servidor' });
	}
};

const create = async (req, res) => {
	try {
		const data = req.body;

		const nameFound = await findAllAssetByName(data.NombreActivo);
		const userFound = await findUserById(data.CreadoPor);
		const lineFound = await findLineById(data.LineaId);

		if (!userFound.exist) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}

		if (!lineFound.exist) {
			return res.status(404).json({ error: 'La linea no existe' });
		}

		if (nameFound.exist) {
			return res.status(409).json({ error: 'El nombre ya está en uso' });
		}

		await AssetModel.create(data);

		return res.status(200).json({ message: 'Se ha creado el registro' });
	} catch (error) {
		{
			console.log(error.message);
			return res.status(500).json({ error: 'Error interno del servidor' });
		}
	}
};

const update = async (req, res) => {
	try {
		const data = req.body;
		const dataFound = await findAssetById(data.ActivoId);
		const userFound = await findUserById(data.ActualizadoPor);
		const nameFound = await findAllAssetByName(data.NombreActivo);
		const lineFound = await findLineById(data.LineaId);

		if (!dataFound.exist) {
			return res.status(404).json({ error: 'El activo no existe' });
		}

		if (!userFound.exist) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}

		if (nameFound.exist && nameFound.data.ActivoId != data.ActivoId) {
			return res.status(409).json({ error: 'El nombre ya está en uso' });
		}

		if (!lineFound.exist) {
			return res.status(404).json({ error: 'La linea no existe' });
		}

		await AssetModel.update(
			Object.assign(data, { ActualizadoEn: new Date() }),
			{
				where: {
					ActivoId: data.ActivoId,
				},
			},
		);
		return res.status(200).json({ message: 'Se ha editado el registro' });
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ error: 'Error interno del servidor' });
	}
};

const disable = async (req, res) => {
	try {
		const data = req.body;
		const dataFound = await findAssetById(data.ActivoId);
		const userFound = await findUserById(data.BorradoPor);

		if (!dataFound.exist) {
			return res.status(404).json({ error: 'El activo no existe' });
		}

		if (!userFound.exist) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}

		await AssetModel.update(
			Object.assign(data, { Borrado: true, BorradoEn: new Date() }),
			{
				where: {
					ActivoId: data.ActivoId,
				},
			},
		);

		return res.status(200).json({ message: 'Se ha eliminado el registro' });
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ error: 'Error interno del servidor' });
	}
};

const setCode = async (req, res) => {
	try {
		const data = req.body;
		const assetFound = await findAssetById(data.ActivoId);
		const userFound = await findUserById(data.CreadoPor);

		if (!assetFound.exist) {
			return res.status(404).json({ error: 'El activo no existe' });
		}

		if (!userFound.exist) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}

		for (let i = 0; i < data.items.length; i++) {
			const item = data.items[i];
			const code = await findAssetByCode(item.NumeroSerie);
			if (code.exist) {
				return res
					.status(409)
					.json({ error: 'El código ya está en uso: ' + item.NumeroSerie });
			}
		}

		for (let i = 0; i < data.items.length; i++) {
			const item = data.items[i];
			await CodeAssetModel.create({
				ActivoId: data.ActivoId,
				NumeroSerie: item.NumeroSerie,
				CreadoPor: data.CreadoPor,
			});
		}

		return res.status(200).json(data);
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ error: 'Error interno del servidor' });
	}
};

export const methods = {
	findAll,
	findById,
	findByName,
	create,
	update,
	disable,
	setCode,
};
