import { Router } from "express";
import * as Controller from "./auth.controller.js";
import { checkEmail } from "../../middleware/checkEmail.js";
import { asyncHandler } from "../../utils/catchError.js";
import * as schema from "./auth.valedation.js";
import { valedation } from "../../middleware/valedation.js";

const router = Router();

router.post('/registor',valedation(schema.registerSchema),checkEmail,asyncHandler(Controller.registor));
router.get('/confirmEmail/:token',Controller.confirmEmail);
router.post('/login',Controller.login);
router.patch('/sendCode',Controller.sendCode);
router.patch('/forgotPassword',Controller.forgotPassword);


export default router; 