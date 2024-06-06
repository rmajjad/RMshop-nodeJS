import { Router } from "express";
import * as Controller from "./auth.controller.js";
import { checkEmail } from "../../middleware/checkEmail.js";
import { asyncHandler } from "../../utils/catchError.js";

const router = Router();

router.post('/registor',checkEmail,asyncHandler(Controller.registor));
router.get('/confirmEmail/:token',Controller.confirmEmail)
router.post('/login',Controller.login);
router.patch('/sendCode',Controller.sendCode);
router.patch('/forgotPassword',Controller.forgotPassword);


export default router; 