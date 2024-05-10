import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';
export const UnitModel = Connection.define(
	'Unit',
	{
		UnidadId:{
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        NombreUnidad:{
            type: DataTypes.STRING
        },
        Borrado:{
            type:DataTypes.BOOLEAN
        },
        CreadoPor:{
            type: DataTypes.INTEGER
        },
        CreadoEn:{
            type: DataTypes.DATE
        },
        ActualizadoPor:{
            type: DataTypes.INTEGER
        },
        ActualizadoEn:{
            type: DataTypes.DATE
        },
        BorradoPor:{
            type: DataTypes.INTEGER
        },
        BorradoEn:{
            type: DataTypes.DATE
        },
	},
	{
		tableName: 'cat_Unidades',
		timestamps: false,
		freezeTableName: false,
	},
);
