import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';
export const MembershipModel = Connection.define(
	'Membership',
	{
		MembresiaId: {
			type: DataTypes.NUMBER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		TipoMembresiaId: {
			type: DataTypes.NUMBER,
		},
		NombreMembresia: {
			type: DataTypes.STRING,
		},
		Horario: {
			type: DataTypes.STRING,
		},
		Descripcion: {
			type: DataTypes.STRING,
		},
		Puntos: {
			type: DataTypes.NUMBER,
		},
		ClaveUnidadsat: {
			type: DataTypes.STRING,
		},
		ClaveProdcutoServicio: {
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
		tableName: 'Membresia',
		timestamps: false,
		freezeTableName: false,
	},
);
