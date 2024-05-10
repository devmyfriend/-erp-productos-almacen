import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const FamilyModel = Connection.define(
    'Family',
    {
        FamiliaId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        NombreFamilia:{
            type: DataTypes.STRING,
        },
        Activo:{
            allowNull: false,
            defaultValue: 1,
            type: DataTypes.TINYINT,
        },
        CreadoPor:{
            type: DataTypes.INTEGER,
        }, 
        CreadoEn:{
            type: DataTypes.DATE,
        },
        ActualizadoPor:{
            type: DataTypes.INTEGER,
        },
        ActualizadoEn:{
            type: DataTypes.DATE,
        },
        BorradoPor:{
            type: DataTypes.INTEGER
        },
        BorradoEn: {
            type: DataTypes.DATE
        }
    },

    {
        tableName: 'cat_Familias',
        timestamps: false,
        freezeTableName: false,
    },
);