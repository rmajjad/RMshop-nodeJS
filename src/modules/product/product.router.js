import { Router } from "express";
import * as Controller from "./product.controller.js";
import fileUpload, { fileType } from "../../utils/multer.js";
import reviewRouter from "./../review/review.router.js"
import { auth } from "../../middleware/auth.js";
import { endPoints } from "./product.role.js";

const router = Router();
router.use('/:productId/review', reviewRouter); 
router.post('/',auth(endPoints.create),fileUpload(fileType.image).fields([
    {name: 'mainImage',maxCount:1},
    {name: 'subImages',maxCount:5},
]),Controller.create);

router.get('/',Controller.getAll);

export default router;