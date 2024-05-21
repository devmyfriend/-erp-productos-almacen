import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const MembershipAccessModel = Connection.define(
	'MembershipsAccess',
	{
		AccesoId: {
			type: DataTypes.NUMBER,
			primaryKey: true,
		},

        MembresiaId: {
			type: DataTypes.NUMBER,
			primaryKey: true,
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
		tableName: 'accesos_membresia',
		timestamps: false,
		freezeTableName: false,
	},
);
