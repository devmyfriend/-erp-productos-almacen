import { DataTypes } from "sequelize";
import { Connection } from "../database/mariadb.database.js";


export const cfgCompositeTaxesxRateModel = Connection.define(
    'CompositeTaxxRate',{
        ImpuestoCompuestoId:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        ImpuestoTasaId:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        Borrado:{
            type: DataTypes.INTEGER
        },
        CreadoPor:{
            type: DataTypes.INTEGER 
        },
        CreadoEn:{
            type: DataTypes.DATE
        },
        CreadoPor:{
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
    },{
        tableName: 'cfgImpCompuestoxTasa',
        timestamps: false,
        freezeTableName: false,
    }
)