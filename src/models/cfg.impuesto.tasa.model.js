

import { DataTypes } from "sequelize";  
import { Connection } from "../database/mariadb.database.js";

export const cfgTaxRateModel = Connection.define(
    'cfgTaxRate',{
        ImpuestoTasaId:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        ImpuestoId:{
            type: DataTypes.INTEGER
        },
        Nombre:{
            type: DataTypes.STRING
        },
        Tasa:{
            type: DataTypes.STRING
        },
        Retencion:{
            type: DataTypes.BOOLEAN
        },
        TipoFactor:{
            type: DataTypes.STRING
        },
        IVA_S_IEPS:{
            type: DataTypes.BOOLEAN
        },
        Desglosar:{
            type: DataTypes.BOOLEAN
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
        tableName: 'cfgImpuestosTasas',
        timestamps: false,
        freezeTableName: false
    }
)