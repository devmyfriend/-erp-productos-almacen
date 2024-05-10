import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const SubFamilyModel = Connection.define(
    'SubFamily',
    {
        SubFamiliaId:{
            allowNull: false,
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        FamiliaId:{
            allowNull: false,
            type: DataTypes.INTEGER
        },
        NombreSubFamilia:{
            type: DataTypes.STRING,
        },
        Activo:{
            allowNull: false,
            defaultValue: 1,
            type: DataTypes.BOOLEAN,
        }, 
        CreadoPor:{
            type: DataTypes.INTEGER,
        }, 
        CreadoEn:{
            type: DataTypes.timestamp,
            defaultValue: Date.now()
        },
        ActualizadoPor:{
            type: DataTypes.INTEGER,
        },
        ActualizadoEn:{
            type: DataTypes.timestamp,
            defaultValue: Date.now()
        },
    },

    {
        tableName: 'cat_SubFamilias',
        timestamps: true,
        freezeTableName: true,
    },
);