

import { cfgTaxRateModel } from "../models/cfg.impuesto.tasa.model.js";

const createTaxRate = async ( req, res )=>{
    const { ImpuestoId, Nombre, Tasa, Retencion, TipoFactor, IVA_S_IEPS, Desglosar, CreadoPor } = req.body

    try{

        const data = await cfgTaxRateModel.create({
            ImpuestoId,
            Nombre,
            Tasa,
            Retencion,
            TipoFactor,
            IVA_S_IEPS,
            Desglosar,
            Borrado: false,
            CreadoPor,
            CreadoEn: Date.now()
        })

        if( !data ){
            return res.status(400).send({
                 error: 'No se pudo crear la configuración del impuesto'
            })
        }

        return res.status(200).send({
            response: data,
            message: 'Se ha creado la configuración del impuesto.'
        })

    }catch( error ){
        console.log( error )
        return res.status(500).send({
             error: 'Error interno en el servidor'
        })
    }

}

const getTaxRate = async ( req, res )=>{

    
    try{
        
        const { ImpuestoTasaId } = req.params
        
        const data = await cfgTaxRateModel.findByPk(ImpuestoTasaId)

        return res.status(200).send({
             response: data,
             message: 'Se ha localizado la configuracion'
        })


    }catch( error ){
        console.log( error )
        return res.status(500).send({
             error: 'Error interno en el servidor'
        })
    }

    
}


const updateTaxRate = async ( req, res )=>{
 
    const { ImpuestoTasaId, ImpuestoId, Nombre, Tasa, Retencion, TipoFactor, IVA_S_IEPS, Desglosar, ActualizadoPor } = req.body

    try{

        const data = await cfgTaxRateModel.update({
            ImpuestoId,
            Nombre,
            Tasa,
            Retencion,
            TipoFactor,
            IVA_S_IEPS,
            Desglosar,
            ActualizadoPor,
            ActualizadoEn: Date.now()
        },{
            where:{
                ImpuestoTasaId: ImpuestoTasaId
            }
        })

        return res.status(200).send({
             message: 'Se ha actualizado la configuración'
        })

    }catch( error ){
        console.log( error )
        return res.status(500).send({
             error: 'Error interno en el servidor.'
        })
    }

}

const disableTaxRate = async ( req, res )=>{


    const { ImpuestoTasaId, BorradoPor } = req.body

    try{

        const data = await cfgTaxRateModel.update({
            Borrado: true,
            BorradoPor,
            BorradoEn: Date.now()
        },{
            where:{
                ImpuestoTasaId: ImpuestoTasaId
            }
        })

        return res.status(200).send({
             message: 'Se ha borrado la configuración'
        })

    }catch( error ){
        console.log( error  )
        return res.status(500).send({
             error: 'Error interno en el servidor.'
        })
    }

}


export const methods = {
    createTaxRate,
    disableTaxRate,
    getTaxRate,
    updateTaxRate,
}