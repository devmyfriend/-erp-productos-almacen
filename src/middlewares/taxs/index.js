
import { cfgCompositeTaxesxRateModel } from "../../models/cfg.imp.compuesto.x.tasa.model.js";
import { cfgTaxModel } from "../../models/cfg.impuesto.model.js";
import { cfgTaxRateModel } from "../../models/cfg.impuesto.tasa.model.js";
import { cfgCompositeTaxs } from "../../models/cfg.impuestos.compuestos.model.js";
import { Impuesto } from "../../models/common/impuesto.model.js";

//cfgImpuestos

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
             error: 'Error interno en el servidor'
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
                 errors: 'No se encontro el id del impuesto'
            })
        }

        next()

    }catch( error ){
        return res.status(500).send({
            error: 'Error interno en el servidor'
       })
    }



}


//cfgImpuestoscompuetos.

export const validateNameCompositeTax = async ( req, res, next )=>{

    const nameCompositeTax = req.body.Nombre

    try{

        const name = await cfgCompositeTaxs.findOne({
            where:{
                Nombre: nameCompositeTax,
                Borrado: false
            }
        })

        if( name ){
            return res.status(400).send({
                 status: 'Error de validación',
                 errors: 'El nombre para el impuesto compuesto ya se encuentra registrado'
            })
        }

        next()
        
    }catch( error ){
        return res.status(500).send({
            error: 'Error interno en el servidor'
        })
    }

}

export const validatePredeterminedCompositeTax = async (req, res, next)=>{

    const  defaultcompoundtax = req.body.Predeterminado

    try{

        if( defaultcompoundtax ){
            
            const data = await cfgCompositeTaxs.update({
                    Predeterminado: false
                },
                {
                    where:{
                        Predeterminado: true
                    }
                }
            )


        }

        next()

    }catch( error ){
        console.log( error)
        return res.status(500).send({
            error: 'Error interno en el servidor'
        })
    }

}

export const validateCompositeTaxId = async ( req, res, next ) =>{

    const taxid = req.body.ImpuestoCompuestoId

    try{

        const tax = await cfgCompositeTaxs.findOne({
            where:{
                ImpuestoCompuestoId:  taxid,
                Borrado: false
            }
        })

        if( tax ){
            return res.status(400).send({
                 status: 'Error de validación',
                 errors: 'No se encontro el ID el impuesto compuesto'
            })
        }

        next()

    }catch( error ){
        return res.status(500).send({
            error: 'Error interno en el servidor'
        })
    }

}

//TODO: VALIDACIONES DE CALCULOS 

//cfgimpuestoscompuestosxtasa

export const validateCompositeTaxIdByTaxRate = async( req, res, next )=>{
    
    const { ImpuestoCompuestoId, ImpuestoTasaId } = req.body

    try{

        //todo: promesa con pipe

        const [ compositetaxid, taxid] = await Promise.all([
            cfgCompositeTaxs.findOne({
                where:{
                    ImpuestoCompuestoId,
                    Borrado: false
                }
            }),
            cfgCompositeTaxesxRateModel.findOne({
                where:{
                    ImpuestoTasaId,
                    Borrado:false
                }
            })            
        ])

        if( !compositetaxid ){
            return res.status(404).send({
                 status: 'Error de validación',
                 error: 'No se encontro el registro del Impuesto Compuesto'
            })
        }

        if( !compositetaxid ){
            return res.status(404).send({
                 status: 'Error de validación',
                 error: 'No se encontro el registro de la Tasa de Impuesto'
            })
        }

        next()

    }catch( error ){
        return res.status(500).send({
            error: 'Error interno en el servidor'
        })
    }
}

//cfgImpuestosTasa

export const validateNameTaxRate = async ( req, res, next )=>{

    const nameTax = req.body.Nombre

    try{

        const tax = await cfgTaxRateModel.findOne({
            where:{
                Nombre: nameTax,
                Borrado: false
            }
        })

        if( tax ){
            return res.status(400).send({
                 status: 'Error de validación',
                 errors: 'El nombre de la tasa ya se encuentra registrado previamente'
            })
        }

    }catch( error ){
        return res.status(500).send({
            error: 'Error interno en el servidor'
        })
    }

}

export const validateTaxRateId = async ( req, res, next ) =>{


    const taxrateid = req.body.ImpuestoTasaId

    try{
        const tax = await cfgTaxRateModel.findOne({
            where:{
                ImpuestoTasaId: taxrateid,
                Borrado: false
            }
        })

        if( !tax){
            return res.status(404).send({
                 status: 'Error de validación',
                 message: 'No se encontro el Impuesto'
            })
        }

        next()

    }catch( error ){
        return res.status(500).send({
            error: 'Error interno en el servidor'
        })
    }

}

