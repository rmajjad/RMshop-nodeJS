import { Router } from "express";
import * as categoryController from "./category.controller.js";
import fileUpload, { fileType } from "../../utils/multer.js";

const router = Router();


router.post('/',fileUpload(fileType.image).single('image'),categoryController.createCategory)
router.get('/',categoryController.getAll);
router.get('/active',categoryController.getActive);
router.get('/:id',categoryController.getDetails);
router.patch('/:id',fileUpload(fileType.image).single('image'),categoryController.updateCategory);
router.delete('/:id',categoryController.destroy);


export default router;