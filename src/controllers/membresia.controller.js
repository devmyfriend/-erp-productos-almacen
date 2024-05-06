import {
	MembershipModel,
	TypeMembershipModel,
	TypeSchedule,
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

	const typeSchedule = await TypeSchedule.findOne({
		attributes: ['TipoPeriodoId', 'PeriodoNombre'],
		where: {
			TipoPeriodoId: type.dataValues.TipoPeriodoId,
		},
	});

	return res.status(200).json({ response: data, type, typeSchedule });
};

export const methods = {
	findAll,
	findById,
};
