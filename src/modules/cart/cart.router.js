import { Router } from "express";
import * as Controller from "./cart.controller.js";
import { auth } from "../../middleware/auth.js";
import { endPoints } from "./cart.role.js";

const router = Router();


router.get('/',auth(endPoints.get),Controller.get);
router.post('/',auth(endPoints.create),Controller.create);
router.put('/updateQuantity/:productId',auth(endPoints.update),Controller.updateQuantity);
router.put('/clear',auth(endPoints.delete),Controller.clearCart);
router.put('/:productId',auth(endPoints.delete),Controller.remove);



export default router;