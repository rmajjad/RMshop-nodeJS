import { Router } from "express";
import * as Controller from "./category.controller.js";
import subcategoryRouter from './../subcategory/subcategory.router.js';
import fileUpload, { fileType } from "../../utils/multer.js";
import { auth, roles } from "../../middleware/auth.js";
import { endPoints } from "./category.role.js";

const router = Router();



router.use('/:id/subcategory',subcategoryRouter);
router.post('/',auth(endPoints.create),fileUpload(fileType.image).single('image'),Controller.create);
router.get('/',auth(endPoints.get),Controller.getAll);
router.get('/active',Controller.getActive);
router.get('/:id',auth(endPoints.get),Controller.getDetails);
router.patch('/:id',auth(endPoints.update),fileUpload(fileType.image).single('image'),Controller.update);
router.delete('/:id',auth(endPoints.delete),Controller.destroy);


export default router;