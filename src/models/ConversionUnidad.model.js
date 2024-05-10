import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';
export const UnitConversionModel = Connection.define(
	'UnitConversion',
	{
		ConversionId:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        UnidadOrigenId:{
            type:DataTypes.INTEGER
        },
        UnidadDestinoId:{
            type: DataTypes.INTEGER
        },
        FactorConversion:{
            type: DataTypes.DECIMAL
        },
        Borrado:{
            type: DataTypes.BOOLEAN
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
        }
	},
	{
		tableName: 'cat_ConversionUnidad',
		timestamps: false,
		freezeTableName: false,
	},
);
