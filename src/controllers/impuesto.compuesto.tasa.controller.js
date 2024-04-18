import { cfgCompositeTaxesxRateModel } from '../models/cfgimpcompestoxtasa.model.js'


// TODO: OBTENER LISTADOS DE RELACION DE IMPUESTOS.

export const test = ( req, res )=>{
    console.log('test')
}

export const getCompositeTaxxRate = async ( req, res ) =>{

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

export const createCompositeTaxesxRate = async ( req, res )=>{

    const { ImpuestoCompuestoId, ImpuestoTasaId, CreadoPor } =  req.body

    try{

        const data = await cfgCompositeTaxesxRateModel.create({
            ImpuestoCompuestoId,
            ImpuestoTasaId,
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

export const updateCompositeTaxesxRate = async ( req, res )=>{
    
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

export const disableCompositeTaxexxRate = async ( req, res )=>{

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