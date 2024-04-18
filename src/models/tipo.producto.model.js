import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';
export const TypeProductModel = Connection.define(
	'Products',
	{
		TipoProductoId: {
			type: DataTypes.NUMBER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		NombreTipoProducto: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		DescripcionTipoProducto: {
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
		tableName: 'TipoProducto',
		timestamps: false,
		freezeTableName: false,
	},
);
