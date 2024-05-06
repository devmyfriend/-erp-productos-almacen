import { cfgCompositeTaxs } from "../models/cfg.impuestos.compuestos.model.js";
import { vwDetalleImpCompTasaModel } from "../models/vwDetallesImpCompTasa.model.js";
import { cfgTaxModel } from "../models/cfg.impuesto.model.js";
import { TaxModel } from "../models/sat.impuesto.model.js";

// TODO: 
//      CALCULOS DE IMPUESTO DE IVA

//  RECORDATORIO QUE POSTERIOMENTE SE VAN A GENERAR LOS PROCESOS DE CALCULOS PARA LOS DE 
//  MAS IMPUESTOS COMO EIPS, RETENCIONES E IMPUESTOS LOCALES.


const getCompositeTaxList = async ( req, res )=>{


    try{

        console.log( 'Ingreso al control ')

        const data = await cfgCompositeTaxs.findAll({
            where:{
                Borrado: false
            }
        })

        console.log(`Información de la base de datos ${ data } `)

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

const getCompositeTax = async ( req, res ) =>{
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
                 error: 'No se encontro el impuesto compuesto'
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

const createCompositeTax = async ( req, res )=>{

    const { Nombre, Predeterminado, CreadoPor } = req.body

    try{

        const data = await cfgCompositeTaxs.create({
            Nombre,
            Predeterminado,
            CreadoPor,
            CreadoEn: Date.now(),
            Borrado: false
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

const updateCompositeTax = async ( req, res )=>{

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
             message: 'Se ha actualizado el impuesto compuesto'
        })

    }catch( error ){
        console.log( error )
        return res.status(500).send({
             error: 'Error interno del servidor'
        })
    }

}

const disableCompositeTax = async ( req, res )=>{

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


const isValidateTax = async ( typeTax, ImpuestoId )=>{

    try{

        const tax =  await cfgTaxModel.findByPk( ImpuestoId )

        const { ClaveImpuesto } = tax.dataValues

        // console.log( tax.dataValues )
        console.log( `ClaveImpuesto ${ ClaveImpuesto }`)

        const typetax = await TaxModel.findAll({
            where:{
                ClaveImpuesto
            }
        })

        console.log( typetax)
        return false

    }catch( error ){
        console.log( error )
        return true
    }

}

const calculateCompoundTaxes = async ( req, res )=>{
    try{

        const { ValorBase, ImpuestoCompuestoId } = req.body

        const taxes = await vwDetalleImpCompTasaModel.findAll({
            attributes: [ 'ImpuestoTasaId', 'Nombre', 'Tasa', 'Retencion', 'IVA_S_IEPS', 'TipoFactor', 'ImpuestoId' ],    
            where: { ImpuestoCompuestoId }
        })

        const { Tasa, Retencion, IVA_S_IEPS, TipoFactor, ImpuestoId } = taxes[0].dataValues

        //VALIDAR QUE SEA UN IMPUESTO TIPO IVA

        isValidateTax( 'IVA', ImpuestoId )

        return res.status(200).send({
             status: 'ok',
             message: 'ok',
             taxes
        })

    }catch( error ){
        console.log( error )
        return res.status(500).send({
             error: 'Error interno en el servidor',
        })
    }
}

export const methods ={
    createCompositeTax,
    disableCompositeTax,
    getCompositeTax,
    getCompositeTaxList,
    updateCompositeTax,
    calculateCompoundTaxes,
}




