import { Router } from "express";
import * as Controller from "./cart.controller.js";
import { auth } from "../../middleware/auth.js";
import { endPoints } from "./cart.role.js";
import { valedation } from "../../middleware/valedation.js";
import * as schema from "./cart.valedation.js";

const router = Router();


router.get('/',auth(endPoints.get),Controller.get);
router.post('/',auth(endPoints.create),valedation(schema.createCartSchema),Controller.create);
router.put('/updateQuantity/:productId',auth(endPoints.update),Controller.updateQuantity);
router.put('/clear',auth(endPoints.delete),Controller.clearCart);
router.put('/:productId',auth(endPoints.delete),Controller.remove);



export default router;