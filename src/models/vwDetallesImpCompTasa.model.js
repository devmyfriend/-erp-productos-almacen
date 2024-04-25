import { DataTypes } from "sequelize";
import { Connection } from "../database/mariadb.database.js";

export const vwDetalleImpCompTasaModel = Connection.define(
    'vwDetallesImpCompTasa',{
        ImpuestoCompuestoId:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        ImpuestoTasaId:{
            type: DataTypes.INTEGER
        },
        Nombre:{
            type: DataTypes.STRING
        }
    },{
        tabaleName: 'vwDetallesImpCompTasa',
        timestamps: false,
        freezeTableName: false,
    }
)