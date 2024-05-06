import { Router } from 'express'
import { methods } from '../controllers/cfgimpuesto.compuesto.controller.js'

const router = Router()

router.post( '/', methods.createCompositeTax )

router.post( '/iva/', methods.calculateCompoundTaxes)

router.get( '/list/', methods.getCompositeTaxList )

router.get( '/:ImpuestoCompuestoId', methods.getCompositeTax )

router.put( '/', methods.updateCompositeTax )

router.delete( '/', methods.disableCompositeTax )

export default router