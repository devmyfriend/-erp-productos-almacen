import { cfgTaxModel } from "../models/cfg.impuesto.model.js";

const findAll = async ( req, res ) =>{
    try{

        const data = await cfgTaxModel.findAll({
            where:{
                Borrado: false
            }
        })

        if( !data ){
            return res.status(404).send({
                error: 'No se encontraron datos'
           })
        }

        return res.status(estatusservidor).send({
             response: data
        })

    }catch( error ){
        console.log( error )
        return res.status(500).send({
            error: 'Error interno del servidor'
        })
    }
}

const findById = async ( req, res )=>{
    
    const taxid = req.params.taxid
    
    try{

        const data = await cfgTaxModel.findByPk( taxid )

        if( !data ){
            return res.status(404).send({
                error: 'No se encontraron datos'
           })
        }

        return res.status(200).send({
             response: data
        })

    }catch( error ){
        console.log( error )
        return res.status(500).send({
            error: 'Error interno del servidor'
        })
    }
}

const findByName = async ( req, res )=>{

    const taxname  = req.params.taxname

    try{

        const data = await cfgTaxModel.findOne({
            where: {
                NombreImpuesto: taxname,
                Borrado: false
            }
        })

        if( !data ){
            return res.status(404).send({
                error: 'No se encontraron el impuesto'
           })
        }

        return res.status(200).send({
            message: 'Se ha encontrado el impuesto',
            response: data
       })

    }catch( error ){
        console.log( error )
        return res.status(500).send({
            error: 'Error interno del servidor'
        })
    }
}


const createTax = async ( req, res )=>{

    const { NombreImpuesto, ClaveImpuesto, CreadoPor } = req.body

    try{

        const data  = await cfgTaxModel.create({
            NombreImpuesto,
            ClaveImpuesto,
            Borrado: false,
            CreadoEn: Date.now(),
            CreadoPor
        })

        if( !data ){
            return res.status(400).send({
                 error: 'No se pudo crear el impuesto'
            })
        }

        return res.status(200).send({
            message: 'Se ha creado el impuesto',
            response: data
       })

    }catch( error ){
        console.log( error )
        return res.status(500).send({
            error: 'Error interno del servidor'
        })

    }

}

const updateTax = async ( req, res  )=>{

    const { cfgImpuestoId, NombreImpuesto, ClaveImpuesto, ActualizadoPor } = req.body

    try{

        const data = await cfgTaxModel.update({
            NombreImpuesto,
            ClaveImpuesto,
            ActualizadoPor,
            ActualizadoEn: Date.now()
        },{
            where:{
                cfgImpuestoId,
                Borrado: false
            }
        })

        if( !data ){
            return res.status(404).send({
                 error: 'No se pudo actualizar los datos del impuesto'
            })
        }

        return res.status(200).send({
            message: 'Se ha actualizado el impuesto',
            response: data
       })

    }catch( error ){
        console.log( error )
        return res.status(500).send({
            error: 'Error interno del servidor'
        })
    }

}

const disableTax = async ( req, res ) =>{

    const { cfgImpuestoId, BorradoPor } = req.body

    try{

        const data = await cfgTaxModel.update({
            Borrado: true,
            BorradoPor,
            BorradoEn: Date.now()
        },{
            where: {
                cfgImpuestoId: cfgImpuestoId,
                Borrado: false
            }
        })

        if( !data ){
            return res.status(404).send({
                error: 'No se encontro el impuesto'
           })
        }

        return res.status(200).send({
            message: 'Se ha borrado el impuesto',
            response: data
       })


    }catch( error ){
        console.log( error )
        return res.status(500).send({
            error: 'Error interno del servidor'
        })
    }

}

export const methods = {
    createTax,
    disableTax,
    findAll,
    findById,
    findByName,
    updateTax
}