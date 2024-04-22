import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';
export const ServiceModel = Connection.define(
	'Servicio',
	{
		ServicioId: {
			type: DataTypes.NUMBER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		TipoServicioId: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		NombreServicio: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		ClaveProductoServicio: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		ImpuestoCompuestoId: {
			type: DataTypes.NUMBER,
		},
		Cita: {
			type: DataTypes.BOOLEAN,
		},
		FechaUltimaVenta: {
			type: DataTypes.DATE,
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
		tableName: 'Servicio',
		timestamps: false,
		freezeTableName: false,
	},
);
