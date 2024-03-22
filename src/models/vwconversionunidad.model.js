import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';
export const vwUnitConversionModel = Connection.define(
	'vwUnitConversion',
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
        NombreUnidadOrigen:{
            type:DataTypes.STRING
        },
        UnidadDestinoId:{
            type: DataTypes.INTEGER
        },
        NombreUnidadDestino:{
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
		tableName: 'vwConversionUnidad',
		timestamps: false,
		freezeTableName: false,
	},
);