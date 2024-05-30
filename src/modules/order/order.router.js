import { Router } from "express";
import * as Controller from "./order.controller.js";
import { auth } from "../../middleware/auth.js";
import { endPoints } from "./order.role.js";

const router = Router();



router.post('/',auth(endPoints.create),Controller.create);
router.get('/all', auth(endPoints.getAll),Controller.getOrders);
router.get('/userOrder', auth(endPoints.getUserOrder),Controller.getUserOrders);
router.patch('/changeStatus/:orderId', auth(endPoints.changeStatus),Controller.changeStatus)


export default router;