import { cfgCompositeTaxesxRateModel } from '../models/cfg.imp.compesto.x.tasa.model.js'
// import { cfgCompositeTaxs } from '../models/cfg.impuestos.compuestos.model.js'
// import { cfgTaxRateModel } from '../models/cfg.impuesto.tasa.model.js'
import { vwDetalleImpCompTasaModel } from '../models/vwDetallesImpCompTasa.model.js'


// TODO: CORREGIR EL getDatailCompositeTaxesxRate




const getDetailComsiteTaxesxRate = async ( req, res )=>{
        
    const { ImpuestoCompuestoId } = req.params

    try{

        const data = await vwDetalleImpCompTasaModel.findAll(
            {
                attributes: [ 'ImpuestoTasaId', 'Nombre' ],
                where:{
                    ImpuestoCompuestoId
                }
            })
        
        return res.status(200).send({
             response: data,
             message: 'Lista de impuestos'
        })

    }catch( error ){
        console.log( error )
        return res.status(500).send({
             error: 'Error interno del servidor'
        })
    }

}

const getCompositeTaxxRate = async ( req, res ) =>{

    const { ImpuestoCompuestoId, ImpuestoTasaId } = req.params

    try{

        // const data = await cfgCompositeTaxesxRateModel.findOne()

    }catch( error ){
        console.log( error )
        return res.status(500).send({
             error: 'Error interno del servidor'
        })
    }

}

const createCompositeTaxesxRate = async ( req, res )=>{

    const { ImpuestoCompuestoId, ImpuestoTasaId, CreadoPor } =  req.body

    try{

        const data = await cfgCompositeTaxesxRateModel.create({
            ImpuestoCompuestoId,
            ImpuestoTasaId,
            Borrado: false,
            CreadoPor,
            CreadoEn:  Date.now()
        })

        if( !data ){
            return res.status(400).send({
                 error: 'No se pudo crear la relación de los impuestos'
            })
        }

        return res.status(200).send({
             response: data,
             message: 'Se ha establecido la realación'
        })

    }catch( error ){
        console.log( error )
        return res.status(500).send({
             error: 'Error interno del servidor'
        })
    }

}

const updateCompositeTaxesxRate = async ( req, res )=>{
    
    const { ImpuestoCompuestoId, ImpuestoTasaId, ActualizadoPor } = req.body

    try{

        const data = await cfgCompositeTaxesxRateModel.update({
            ImpuestoCompuestoId,
            ImpuestoTasaId,
            ActualizadoPor,
            ActaulizadoEn:  Date.now()
        },{
            where:{
                ImpuestoCompuestoId: ImpuestoCompuestoId,
                ImpuestoTasaId: ImpuestoTasaId
            }
        })

        if( !data ){
            return res.status(400).send({
                 error: 'No se puedo actaulizar el registro'
            })
        }

        return res.status(200).send({
             message: 'Se ha actualizado los datos de la relación de los impuestos'
        })


    }catch( error ){
        console.log( error )
        return res.status(500).send({
             error: 'Error interno del servidor'
        })
    }


}

const disableCompositeTaxexxRate = async ( req, res )=>{

    const { ImpuestoCompuestoId, ImpuestoTasaId, BorradoPor } = req.body

    try{

        const data = await cfgCompositeTaxesxRateModel.update({
            Borrado: true,
            BorradoPor,
            BorradoEn: Date.now()
        },{
            where:{
                ImpuestoCompuestoId: ImpuestoCompuestoId,
                ImpuestoTasaId: ImpuestoTasaId
            }
        })

        if( !data ){
            return res.status(400).send({
                 error: 'No se puedo borrar la relación'
            })
        }

        return res.status(200).send({
             message: 'Se ha borrado la relación'
        })

    }catch( error ){
        console.log( error )
        return res.status(500).send({
             error: 'Error interno del servidor'
        })
    }

}

export const methods = {
    createCompositeTaxesxRate,
    disableCompositeTaxexxRate,
    getCompositeTaxxRate,
    getDetailComsiteTaxesxRate,
    updateCompositeTaxesxRate
}