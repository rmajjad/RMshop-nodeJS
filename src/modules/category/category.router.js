import { Router } from "express";
import * as categoryController from "./category.controller.js";
import fileUpload, { fileType } from "../../utils/multer.js";

const router = Router();

router.get('/',categoryController.getAll);
router.post('/',fileUpload(fileType.image).single('image'),categoryController.createCategory)

export default router;