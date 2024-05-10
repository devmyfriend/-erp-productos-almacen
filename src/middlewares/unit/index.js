import { UnitModel } from "../../models/unidad.model.js"


export const validateUnitName = async ( req, res, next )=>{

    const unitname = req.body.NombreUnidad

    try{
        const unit = await  UnitModel.findOne({
            where:{
                NombreUnidad: unitname,
                Borrado: false

            }
        })

        if( unit ){
            return res.status(400).send({
                 status: 'Error de validación',
                 errors: 'El nombre de la Unidad ya ha sido utilizado'
            })
        }

        next()

    }catch( error ){
        return res.status(500).send({
             errors: 'Error interno en el servidor'
        })
    }
}

export const validateUnitId = async ( req, res, next )=>{

    const unitid = req.params.unitid
    

    try{
        const unit = await  UnitModel.findByPk( unitid )

        if( !unit ){
            return res.status(404).send({
                 status: 'Error de validación',
                 errors: 'El id de la unidad no existe'
            })
        }

        next()

    }catch( error ){
        console.log( error )
        return res.status(500).send({
             errors: 'Error interno en el servidor'
        })
    }
}

export const validateFindUnitName = async ( req, res, next )=>{

    const unitname = req.params.unitname

    try{
        const unit = await  UnitModel.findOne({
            where:{
                NombreUnidad: unitname,
                Borrado: false

            }
        })

        if( !unit ){
            return res.status(400).send({
                 status: 'Error de validación',
                 errors: 'El nombre de la Unidad ya ha sido utilizado'
            })
        }

        next()

    }catch( error ){
        return res.status(500).send({
             errors: 'Error interno en el servidor'
        })
    }
}