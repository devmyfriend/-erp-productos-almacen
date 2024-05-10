
import { UnitConversionModel } from "../models/ConversionUnidad.model.js";
import { vwUnitConversionModel } from "../models/vwconversionunidad.model.js";

export const createUnitConversion = async ( req, res ) => {

    const { UnidadOrigenId, UnidadDestinoId, FactorConversion, CreadoPor } = req.body

    console.log( `Unidad de origen ${ UnidadOrigenId }`)
    console.log( `Unidad de destino ${ UnidadDestinoId }`)
    console.log( `Unidad de factor ${ FactorConversion }`)
    console.log( `Unidad de origen ${ CreadoPor }`)

    try{

        const data = await UnitConversionModel.create({
            UnidadOrigenId,
            UnidadDestinoId,
            FactorConversion,
            Borrado: 0,
            CreadoPor,
            CreadoEn: Date.now()
        })

        if(!data){
            return res.status(400).send({
                 error: 'No se pudo registrar la conversión de medida'
            })
        }

        return res.status(200).send({
             message: 'Se ha registrado la conversion'
        })

    }catch( error ){
        console.log(error)
        return res.status(500).send({
             error: 'Error interno del servidor'
        })
    }

}

export const findAll = async ( req, res ) =>{
    try{

        const data  = await vwUnitConversionModel.findAll({
            where:{
                Borrado: false
            }
        })

        if(!data){
            return res.status(404).send({
                 error: 'No existen conversiones'
            })
        }

        return res.status(200).send({
             message: 'Lista de conversiones',
             data
        })


    }catch( error ){
        return res.status(500).send({
             error: 'Error interno del servidor'
        })
    }
}

export const findByUnitSourceId = async ( req, res )=>{
    
    const { unitsourceid } = req.params
    
    try{

        const data = await vwUnitConversionModel.findOne({
            attributes:[ 
                'ConversionId', 
                'UnidadOrigenId',
                'NombreUnidadOrigen',
                'UnidadDestinoId',
                'NombreUnidadDestino',
                'FactorConversion' 
            ],
            where:{
                Borrado: false,
                UnidadOrigenId: unitsourceid
            }
        })

        if(!data){
            return res.status(404).send({
                error: 'No se encontro la unidad de conversión'
            })
        }

        return res.status(200).send({
             message: 'La unidad de conversión',
             data
        })

    }catch( error ){
        console.log( error )
        return res.status(500).send({
             error: 'Error interno del servidor'
        })
    }
}

export const updateUnitConversion = async ( req, res )=>{
    
    const { ConversionId, UnidadDestinoId, FactorConversion, ActualizadoPor, } = req.body

    try{

        const data = await UnitConversionModel.update({
            UnidadDestinoId,
            FactorConversion,
            ActualizadoPor,
            ActualizadoEn: Date.now()
        },{
            where: {
                ConversionId,
                Borrado: false
            }
        })

        if( !data ){
            return res.status(400).send({
                 error: 'Error, no se pudo actualizar los datos'
            })
        }

        return res.status(200).send({
             message: 'Se ha actualizado los datos de la conversión',
             data
        })

    }catch( error ){
        console.log( error )
        return res.status(500).send({
             error: 'Error interno en el servidor'
        })
    }
}

export const disableConversionUnit = async ( req, res )=>{
    const { ConversionId, BorradoPor } = req.body

    console.log( `ConversionId ${ ConversionId }` )
    console.log( `BorradoPor ${ BorradoPor }` )

    try{
        
        const data = await UnitConversionModel.update({
            Borrado: true,
            BorradoPor:  BorradoPor,
            BorradoEn: Date.now()
        },{
            where: {
                ConversionId,
                Borrado: false
            }
        })

        if(!data){
            return res.status(404).send({
                 error: 'No se encontro el registro'
            })
        }

        return res.status(200).send({
             error: 'Se ha borrado la conversión'
        })

    }catch( error ){
        console.log( error )
        return res.status(500).send({
             error: 'Error interno en el servidor'
        })
    }
}

export const methods ={
    createUnitConversion,
    findAll,
    findByUnitSourceId,
    updateUnitConversion,
    disableConversionUnit,
}