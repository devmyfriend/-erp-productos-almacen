import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';
export const GenProductModel = Connection.define(
	'GenProducts',
	{
		ProductoId: {
			type: DataTypes.NUMBER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		CodigoProducto: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
		},

		NombreProducto: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		TipoProductoId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},

		DescripcionProducto: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		ClaveUnidadSat: {
			type: DataTypes.STRING,
		},

		ClaveProductoServicio: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		LineaId: {
			type: DataTypes.NUMBER,
			allowNull: false,
		},


		Puntos: {
			type: DataTypes.NUMBER,
			allowNull: true,
		},
		Serie: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
		},
        Venta: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
		},
        Insumo: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
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
		tableName: 'Producto',
		timestamps: false,
		freezeTableName: false,
	},
);
