import { Router } from "express";
import * as Controller from "./category.controller.js";
import subcategoryRouter from './../subcategory/subcategory.router.js';
import fileUpload, { fileType } from "../../utils/multer.js";
import { auth } from "../../middleware/auth.js";

const router = Router();

router.use('/:id/subcategory',subcategoryRouter);
router.post('/',auth(),fileUpload(fileType.image).single('image'),Controller.create);
router.get('/',Controller.getAll);
router.get('/active',Controller.getActive);
router.get('/:id',Controller.getDetails);
router.patch('/:id',auth(),fileUpload(fileType.image).single('image'),Controller.update);
router.delete('/:id',auth(),Controller.destroy);


export default router;