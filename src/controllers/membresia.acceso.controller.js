import {
	findAccesById,
	findAccesByName,
	findMembershipById,
	findPermissionInMembership,
	findUserById,
} from '../middlewares/finders/index.js';
import { AccessModel, MembershipAccessModel } from '../models/index.js';

const findAll = async (req, res) => {
	try {
		const data = await AccessModel.findAll({
			attributes: ['AccesoId', 'NombreAcceso', 'Completo', 'CreadoEn'],
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

		await AccessModel.update(
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

const disable = async (req, res) => {
	try {
		const data = req.body;

		const dataFound = await findAccesById(data.AccesoId);
		const userFound = await findUserById(data.BorradoPor);

		if (!dataFound.exist) {
			return res.status(404).json({ error: 'Acceso no encontrado' });
		}

		if (!userFound.exist) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}

		await AccessModel.update(
			Object.assign(data, { BorradoEn: new Date(), Borrado: true }),
			{ where: { AccesoId: data.AccesoId } },
		);

		return res.status(200).json({
			message: 'Se ha borrado el registro',
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error: 'Error interno del servidor',
		});
	}
};

const addAccess = async (req, res) => {
	try {
		const data = req.body;
		const userFound = await findUserById(data.CreadoPor);
		const membershipFound = await findMembershipById(data.MembresiaId);

		if (!userFound.exist) {
			return res.status(404).json({ error: 'Usuario no encontrado' });
		}

		if (!membershipFound.exist) {
			return res.status(404).json({ error: 'La membresia no existe' });
		}

		for (let i = 0; i < data.Accesos.length; i++) {
			const item = data.Accesos[i];
			const accessFound = await findAccesById(item.AccesoId);
			const accessAddedFound = await findPermissionInMembership(
				item.AccesoId,
				data.MembresiaId,
			);

			if (!accessFound.exist) {
				return res
					.status(404)
					.json({ error: 'Acceso no encontrado: ' + item.AccesoId });
			}

			if (accessAddedFound.exist) {
				return res.status(409).json({
					error:
						'EL acceso ya está asignado a esta membresia: ' + item.AccesoId,
				});
			}
		}

		for (let i = 0; i < data.Accesos.length; i++) {
			const item = data.Accesos[i];
			await MembershipAccessModel.create({
				MembresiaId: data.MembresiaId,
				AccesoId: item.AccesoId,
				CreadoPor: data.CreadoPor,
			});
		}

		return res.json({ message: 'Se han creado los registros' });
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
	addAccess,
};
