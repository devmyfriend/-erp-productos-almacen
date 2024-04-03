import { DataType, DataTypes } from "sequelize";
import { Connection } from "../database/mariadb.database";

export const cfgTaxModel = Connection.define(
    'cfgTax',
    {
        cfgImpuestoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true
        },
        NombreImpuesto:{
            type: DataTypes.STRING,
            allowNull: true
        },
        ClaveImpuesto:{
            type: DataTypes.STRING,
            allowNull: true
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
        },
    },
    {
        tableName: 'cfgImpuestos',
        timestamps: false,
        freezeTableName: false
    }
)