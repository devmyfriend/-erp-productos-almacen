import { FamilyModel } from "../models/familia.model"


const create = async ( req, res )=>{
    const { NombreFamilia, CreadoPor } = req.body

    try{

        const newFamily = await FamilyModel.create({
            NombreFamilia,
            CreadoPor,
            CraedoEn: Date.now()
        })

        if( !newFamily ){
            return res.status(404).send({
                 error: 'No se pudo crea la Familia'
            })
        }

        return res.status(200).send({
             response: newFamily,
             message: 'Se ha creado la Familia'
        })

    }catch( error ){
        console.log( error )
        return res.status(500).send({
            error: 'Error interno en el servidor'
        })
    }   
}

const update = async ( req, res )=>{
    
    const { FamiliaId, NombreFamilia, ActualizadoPor } = req.body

    try{

        const updateFamily = await FamilyModel.update({
            NombreFamilia,
            ActualizadoPor,
            ActualizadoEn: Date.now()
        },{
            where:{
                FamiliaId
            }
        })

        if( !updateFamily ){
            return res.status(404).send({
                 error: 'No se pudo actualizar la familia'
            })
        }

        return res.status(200).send({
             response: updateFamily,
             message: 'Se ha actualizado la familia'
        })

    }catch( error ){
        console.log( error )
        return res.status(500).send({
            error: 'Error interno en el servidor'
        })
    }
}

const disable = async ( req, res )=>{

    const { FamiliaId, BorradoPor } = req.body

    try{

        const disableFamily = await FamilyModel.update({
            Activo: false,
            BorradoPor,
            BorradoEn:  Date.now()
        },{
            where:{
                FamiliaId
            }
        })

        if( !disableFamily ){
            return res.status(404).send({
                 error: 'No se pudo desactivar la familia'
            })
        }

        return res.status(200).send({
             message: 'Se ha desactivado la Familia'
        })

    }catch( error ){
        console.log( error )
        return res.status(500).send({
            error: 'Error interno en el servidor'
        })
    }

}

const undisable = async ( req, res )=>{

    const { FamiliaId, ActualizadoPor } = req.body

    try{

        const disableFamily = await FamilyModel.update({
            Activo: true,
            BorradoPor: Null,
            ActualizadoEn: Date.now(),
            BorradoEn:  null
        },{
            where:{
                FamiliaId
            }
        })

        if( !undisable ){
            return res.status(404).send({
                 error: 'No se pudo reactivar la familia'
            })
        }

        return res.status(200).send({
             message: 'Se ha reactivado la familia'
        })


    }catch( error ){
        console.log( error )
        return res.status(500).send({
            error: 'Error interno en el servidor'
        })
    }

}

const getFamilyById = async ( req, res )=>{

    const FamiliaId = req.params.FamiliaId

    try{

        const data  = await  FamilyModel.findOne({
            where:{
                FamiliaId
            }
        })

        return res.status(200).send({
             response: data,
             message: 'Se ha obtenido los datos de la familia'
        })

    }catch( error ){
        return res.status(500).send({
            error: 'Error interno en el servidor'
        })
    }


}


export const methods = {
    create,
    update,
    disable,
    undisable,
    getFamilyById,
}