

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
            type: DataTypes.DECIMAL
        },
        Retencion:{
            type: DataTypes.BOOLEAN
        },
        TipoFactor:{
            type: DataTypes.INTEGER
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