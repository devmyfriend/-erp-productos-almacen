import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';
export const TypeScheduleModel = Connection.define(
	'TypeSchedule',
	{
		TipoPeriodoId: {
			type: DataTypes.NUMBER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		PeriodoNombre: {
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
		tableName: 'TipoPeriodo',
		timestamps: false,
		freezeTableName: false,
	},
);
