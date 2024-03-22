import { Router } from "express";
import { methods } from "../controllers/conversionunidad.controller.js";


const router = Router()

router.post('/', methods.createUnitConversion)
router.get('/', methods.findAll)
router.get('/', methods.findByUnitSourceId)
router.put('/', methods.updateUnitConversion)
router.delete('/', methods.disableConversionUnit)

export default router