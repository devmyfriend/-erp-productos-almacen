import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';
export const TypeServiceModel = Connection.define(
	'TypeService',
	{
		TipoServicioId: {
			type: DataTypes.NUMBER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		SucursalId: {
			type: DataTypes.INTEGER,
		},
		NombreTipoServicio: {
			type: DataTypes.STRING,
			allowNull: false,
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
		tableName: 'TipoServicio',
		timestamps: false,
		freezeTableName: false,
	},
);
