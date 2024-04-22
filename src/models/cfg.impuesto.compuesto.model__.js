import { DataTypes } from "sequelize";
import { Connection } from "../database/mariadb.database.js";



export const cfgTaxCompoundModel = Connection.define(
    'TaxCompound',
    {
        ImpuestoCompuestoId:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false
        },
        Nombre:{
            type: DataTypes.STRING
        },
        Predeterminado:{
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
        tableName: 'cfgImpuestosCompuestos',
        timestamps: false,
        freezeTableName: false
    }
)