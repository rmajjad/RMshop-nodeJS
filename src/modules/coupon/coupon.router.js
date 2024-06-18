import { Router } from "express";
import * as Controller from "./coupon.controller.js";
import subcategoryRouter from '../subcategory/subcategory.router.js';
import fileUpload, { fileType } from "../../utils/multer.js";
import { auth } from "../../middleware/auth.js";
import { endPoints } from "./coupon.role.js";
import { valedation } from "../../middleware/valedation.js";
import * as schema from "./coupon.valedation.js";

const router = Router();



router.post('/',auth(endPoints.create),valedation(schema.createCouponSchema),Controller.create);


export default router;