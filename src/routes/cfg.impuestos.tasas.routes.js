import { Router } from "express";
import { methods } from "../controllers/cfg.impuesto.tasa.js";


const router = Router()

router.post( '/', methods.createTaxRate )
router.get( '/:ImpuestoTasaId', methods.getTaxRate )
router.put( '/', methods.updateTaxRate )
router.delete( '/', methods.disableTaxRate )

export default router