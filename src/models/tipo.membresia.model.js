import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';
export const TypeMembershipModel = Connection.define(
	'TypeMembership',
	{
		TipoMembresiaId: {
			type: DataTypes.NUMBER,
			primaryKey: true,
		},
		TipoPeriodoId: {
			type: DataTypes.NUMBER,
		},

		NombreTipoMembresia: {
			type: DataTypes.STRING,
		},
		Cita: {
			type: DataTypes.BOOLEAN,
		},
		MinimoAsociados: {
			type: DataTypes.NUMBER,
		},

		CreadoPor: {
			type: DataTypes.INTEGER,
		},
		CreadoEn: {
			type: DataTypes.DATE,
		},
		ActualizadoPor: {
			type: DataTypes.INTEGER,
		},
		ActualizadoEn: {
			type: DataTypes.DATE,
		},
		BorradoPor: {
			type: DataTypes.INTEGER,
		},

		BorradoEn: {
			type: DataTypes.DATE,
		},
		Borrado: {
			type: DataTypes.BOOLEAN,
		},
	},
	{
		tableName: 'TipoMembresia',
		timestamps: false,
		freezeTableName: false,
	},
);
