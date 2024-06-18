import { Router } from "express";
import * as Controller from "./product.controller.js";
import fileUpload, { fileType } from "../../utils/multer.js";
import reviewRouter from "./../review/review.router.js"
import { auth } from "../../middleware/auth.js";
import { endPoints } from "./product.role.js";
import { valedation } from "../../middleware/valedation.js";
import * as schema from "./product.valedation.js";
import { asyncHandler } from "../../utils/catchError.js";

const router = Router();
router.use('/:productId/review', reviewRouter); 
router.post('/',fileUpload(fileType.image).fields([
    {name: 'mainImage',maxCount:1},
    {name: 'subImages',maxCount:5},
]),asyncHandler(valedation(schema.createProductSchema)) , auth(endPoints.create),asyncHandler(Controller.create)); 

router.get('/',Controller.getAll);

export default router;