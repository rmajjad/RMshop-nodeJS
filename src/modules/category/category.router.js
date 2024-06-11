import { Router } from "express";
import * as Controller from "./category.controller.js";
import subcategoryRouter from './../subcategory/subcategory.router.js';
import fileUpload, { fileType } from "../../utils/multer.js";
import { auth } from "../../middleware/auth.js";
import { endPoints } from "./category.role.js";
import { valedation } from "../../middleware/valedation.js";
import * as schema from "./category.valedation.js";

const router = Router();



router.use('/:id/subcategory',subcategoryRouter);
router.post('/',fileUpload(fileType.image).single('image'),valedation(schema.createCategorySchema),auth(endPoints.create),Controller.create);
router.get('/',auth(endPoints.get),Controller.getAll);
router.get('/active',Controller.getActive);
router.get('/:id',valedation(schema.getDetailsSchema),auth(endPoints.get),Controller.getDetails);
router.patch('/:id',fileUpload(fileType.image).single('image'),valedation(schema.updateSchema),auth(endPoints.update),Controller.update);
router.delete('/:id',valedation(schema.deleteCategorySchema),auth(endPoints.delete),Controller.destroy);


export default router;