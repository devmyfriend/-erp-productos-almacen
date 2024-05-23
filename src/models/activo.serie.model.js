import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const CodeAssetModel = Connection.define(
	'CodeAsset',
	{
		ActivoSerieId: {
			type: DataTypes.NUMBER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		ActivoId: {
			type: DataTypes.NUMBER,
		},
		NumeroSerie: {
			type: DataTypes.STRING,
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
		tableName: 'ActivoSerie',
		timestamps: false,
		freezeTableName: false,
	},
);
