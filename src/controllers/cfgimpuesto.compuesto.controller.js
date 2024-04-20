import { cfgCompositeTaxs } from "../models/cfg.impuestos.compuestos.model.js";

// TODO: 
//      CALCULOS DE IMPUESTO DE IVA

//  RECORDATORIO QUE POSTERIOMENTE SE VAN A GENERAR LOS PROCESOS DE CALCULOS PARA LOS DE 
//  MAS IMPUESTOS COMO EIPS, RETENCIONES E IMPUESTOS LOCALES.


export const getCompositeTaxList = async ( req, res )=>{


    try{

        const data = await cfgCompositeTaxs.findAll({
            where:{
                Borrado: false
            }
        })

        if( !data ){
            return res.status(404).send({
                 error: 'No se encontraron los impuestos compuestos'
            })
        }

        return res.status(200).send({
             response: data,
             message: 'Listado de impuestos compuestos'
        })


    }catch( error ){
        console.log( error )
        return res.status(500).send({
             error: 'Error interno del servidor'
        })
    }
}

export const getCompositeTax = async ( req, res ) =>{
    const { ImpuestoCompuestoId } = req.params

    try{

        const data = await cfgCompositeTaxs.findOne({
            attributes:['Nombre', 'Predeterminado'],
            where:{
                ImpuestoCompuestoId : ImpuestoCompuestoId,
                Borrado: false
            }
        })

        if( !data ){
            return res.status(404).send({
                 error: 'No se encontro el impuesto compueto'
            })
        }

        return res.status(200).send({
             response: data,
             message: 'El se ha encontrado el impuesto compuesto'
        })

    }catch( error ){
        console.log( error )
        return res.status(500).send({
             error: 'Error interno del servidor'
        })
    }
}

export const createCompositeTax = async ( req, res )=>{

    const { Nombre, Predeterminado, CreadoPor } = req.body

    try{

        const data = await cfgCompositeTaxs.create({
            Nombre,
            Predeterminado,
            CreadoPor,
            CreadoEn: Date.now()
        })

        if( !data ){
            return res.status(400).send({
                 error: 'No se pudo crear el impuesto compuesto'
            })
        }

        return res.status(200).send({
             message: 'Se ha craedo el impuesto compuesto',
             response: data
        })

    }catch( error ){
        console.log( error )
        return res.status(500).send({
             error: 'Error interno del servidor'
        })
    }

}

export const updateCompositeTax = async ( req, res )=>{

    const { ImpuestoCompuestoId, Nombre, Predeterminado, ActualizadoPor } = req.body

    try{

        const data = await cfgCompositeTaxs.update({
            Nombre,
            Predeterminado,
            ActualizadoPor,
            ActualizadoEn: Date.now()
        },{
            where:{
                ImpuestoCompuestoId: ImpuestoCompuestoId,
                Borrado: false
            }
        })

        if( !data ){
            return res.status(400).send({
                 error: 'No se pudo actualizar los datos del impuesto compuesto'
            })
        }

        return res.status(200).send({
             response: data,
             message: 'Se ha actualizado el impuesto compuesto'
        })

    }catch( error ){
        console.log( error )
        return res.status(500).send({
             error: 'Error interno del servidor'
        })
    }

}

export const disableCompositeTax = async ( req, res )=>{

    const { ImpuestoCompuestoId, BorradoPor } = req.body

    try{

        const data = await cfgCompositeTaxs.update({
            Borrado: true,
            BorradoPor,
            BorradoEn: Date.now()
        },{
            where:{
                ImpuestoCompuestoId: ImpuestoCompuestoId,
                Borrado: false
            }
        })

        if( !data ){
            return res.status(400).send({
                 error: 'No se pudo borrar el impuesto compuesto'
            })
        }

        return res.status(200).send({
             message: 'Se ha borrado el impuesto compuesto'
        })

    }catch( error ){
        console.log( error )
        return res.status(500).send({
             error: 'Error interno del servidor'
        })
    }


}




