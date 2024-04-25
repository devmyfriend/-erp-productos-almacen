import { Router } from "express";
import { methods } from '../controllers/cfgimpuesto.compuesto.tasa.controller.js'

const router = Router()

router.post( '/', methods.createCompositeTaxesxRate )

router.get('/detail/:ImpuestoCompuestoId', methods.getDetailCompositeTaxesxRate )

router.put( '/', methods.updateCompositeTaxesxRate )

router.delete( '/', methods.disableCompositeTaxexxRate )

export default router