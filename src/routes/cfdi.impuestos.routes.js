import { Router } from 'express'
import { methods } from '../controllers/cfg.impuestos.controller.js'

const router = Router()

router.post('/', methods.createTax)

router.get('/',methods.findAll)

router.get('/:taxid', methods.findById)

router.get('/:taxname', methods.findByName)

router.put('/',methods.updateTax)

router.delete('/', methods.disableTax)

export default router