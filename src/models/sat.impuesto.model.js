import {  DataTypes } from 'sequelize'
import { Connection } from '../database/mariadb.database.js'


export const TaxModel = Connection.define(
    'Tax',
    {
        ClaveImpuesto:{
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false

        },
        Nombre:{
            type: DataTypes.STRING,
            allowNull: false
        },
        Activo:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        tableName: 'SAT_Impuestos',
        timestamps: false,
        freezeTableName: false
    }
)