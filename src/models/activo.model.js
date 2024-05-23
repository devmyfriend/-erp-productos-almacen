import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const AssetModel = Connection.define(
	'Asset',
	{
		ActivoId: {
			type: DataTypes.NUMBER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		NombreActivo: {
			type: DataTypes.STRING,
		},

		Descripcion: {
			type: DataTypes.STRING,
		},

		Existencias: {
			type: DataTypes.NUMBER,
		},
		Precio: {
			type: DataTypes.NUMBER,
		},

		ImpuestoCompuestoId: {
			type: DataTypes.INTEGER,
		},
		LineaId: {
			type: DataTypes.INTEGER,
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
		tableName: 'Activos',
		timestamps: false,
		freezeTableName: false,
	},
);
