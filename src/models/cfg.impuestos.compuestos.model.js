import { DataTypes } from "sequelize";  
import { Connection } from "../database/mariadb.database";  


export const cfgCompositeTaxs = Connection.define(
    'CompositeTax',{
        ImpuestoCompuestoId:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
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
        },
    },{
        tableName: 'cfgImpuestosCompuestos',
        timestamps: false,
        freezeTableName: false
    }
)