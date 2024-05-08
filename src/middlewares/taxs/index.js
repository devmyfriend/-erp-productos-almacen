
import { cfgTaxModel } from "../../models/cfg.impuesto.model.js";
import { Impuesto } from "../../models/common/impuesto.model.js";

export const validateTaxName = async ( req, res, next )=>{

    const taxname = req.body.NombreImpuesto

    try{

        const name = await cfgTaxModel.findOne({
            where:{
                NombreImpuesto: taxname,
                Borrado: false
            }
        })

        if( name ){
            return res.status(400).send({
                 status: 'Error de vaidacion',
                 errors: 'El nombre del impuesto ya ha sido utilizado'
            })
        }

        next()

    }catch( error ){
        return res.status(500).send({
            errors: 'Error interno en el servidor'
        })
    }

}

export const validateTaxCode = async ( req, res, next )=>{

    const taxcode = req.body.ClaveImpuesto

    try{

        const code = await Impuesto.findOne({
            where:{
                ClaveImpuesto: taxcode,
                Activo: true
            }
        })

        if( !code ){
            return res.status(404).send({
                 status: 'Error de validacion',
                 message: 'No se encontro la clave del impuesto'
            })
        }

        next()

    }catch( error ){
        return res.status(500).send({
             status: 'Error interno en el servidor'
        })
    }

}

export const validateTaxId = async ( req, res, next )=>{

    const TaxId = req.body.cfgImpuestoId

    try{

        const id = await cfgTaxModel.findOne({
            where:{
                cfgImpuestoId: TaxId,
                Borrado: false
            }
        })

        if( !id ){
            return res.status(404).send({
                 status: 'Error de validacion',
                 message: 'No se encontro el id del impuesto'
            })
        }

        next()

    }catch( error ){
        return res.status(500).send({
            status: 'Error interno en el servidor'
       })
    }



}
