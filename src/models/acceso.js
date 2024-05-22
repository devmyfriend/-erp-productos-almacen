import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const AccessModel = Connection.define(
	'Access',
	{
		AccesoId: {
			type: DataTypes.NUMBER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		NombreAcceso: {
			type: DataTypes.STRING,
		},

		Completo: {
			type: DataTypes.BOOLEAN,
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
		tableName: 'Accesos',
		timestamps: false,
		freezeTableName: false,
	},
);
