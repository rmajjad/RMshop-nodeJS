import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { endPoints } from "./review.role.js";
import * as Controller from "./review.controller.js";
import fileUpload, { fileType } from "../../utils/multer.js";


const router = Router({mergeParams:true});

router.post('/',auth(endPoints.create),fileUpload(fileType.image).single('image'),Controller.create);

export default router;