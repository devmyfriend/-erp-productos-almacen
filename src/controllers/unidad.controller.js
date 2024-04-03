import { UnitModel } from "../models/unidad.model.js"


const findAll = async ( req, res ) =>{
    try{
        const data  = await UnitModel.findAll({
            attributes: [ 'UnidadId', 'NombreUnidad' ],
            where: {
                Borrado: 0
            }
        })

        if( !data){
            return res.status(404).send({
                 error: 'No se encontraron datos'
            })
        }

        return res.status(200).send({
             response: data
        })

    }catch( error ){
        return res.status(500).send({
             error: 'Error interno del servidor'
        })
    }
}

const findById = async ( req, res )=>{
    const id = req.params.unitid
    try{

        const unit = await UnitModel.findByPk( id )

        if(!unit){
            return res.status(404).send({
                 error: 'No se encontro la unidad'
            })
        }

        return res.status(200).send({
             message: 'Se ha encontrado la unidad',
             response: unit
        })

    }catch( error ){
        return res.status(500).send({
            error: 'Error interno del servidor'
       })
    }
}

const findByName = async ( req, res )=>{
    const unitname = req.params.unitname
    
    try{

        const unit = await UnitModel.findOne({
            where: { NombreUnidad: unitname }
        })

        if(!unit){
            return res.status(404).send({
                 error: 'No se encontro la unidad'
            })
        }

        return res.status(200).send({
             message: 'Se ha encontrado la unidad',
             response: unit
        })

    }catch( error ){
        return res.status(500).send({
            error: 'Error interno del servidor'
       })
    }
}

const create = async ( req, res ) =>{
    try{

        const { NombreUnidad, CreadoPor } = req.body

        

        const data = await UnitModel.create({ 
            NombreUnidad,
            Borrado: false,
            CreadoPor: CreadoPor,
            CreadoEn: Date.now()
        })

        if( !data ){
            return res.status(400).send({
                 error: 'No se pudo crear la unidad'
            })
        }

        return res.status(200).send({
             response: data,
             message: 'Se ha creado la Unidad de Medida'
        })
        

    }catch( error ){
        return res.status(500).send({
            error: 'Error interno del servidor'
       })
    }
}

const update = async ( req, res ) =>{
    const { UnidadId, NombreUnidad, ActualizadoPor } = req.body
    
    try{

        const data = await UnitModel.update({
            NombreUnidad: NombreUnidad,
            ActualizadoPor: ActualizadoPor,
            ActualizadoEn: Date.now()
        },{
            where:{
                UnidadId: UnidadId
            }
        })

        console.log( data )

        if(!data){
            return res.status(400).send({
                 error: 'No se pudo actualizar el registro'
            })
        }


        return res.status(200).send({
             message: 'Se ha actualizado los datos de la unidad'
        })

    }catch( error ){
        return res.status(500).send({
            message: 'Error interno del servidor'
        })
    }
}

const disable = async ( req, res ) =>{

    const { UnidadId, BorradoPor }  = req.body

    try{

        const data = await UnitModel.update({
            Borrado: true,
            BorradoPor: BorradoPor,
            BorradoEn: Date.now()
        },{
            where: { UnidadId: UnidadId }
        })

        return res.status(200).send({
             message: 'Se ha borrado la Unidad',
             response: data
        })

    }catch( error ){
        return res.status(500).send({
            
             error: 'Error interno del servidor '
        })
    }

}


export const methods = {
    create,
    disable,
    findAll,
    findById,
    findByName,
    update,
}