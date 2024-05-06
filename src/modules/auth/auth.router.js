import { Router } from "express";
import * as Controller from "./auth.controller.js";

const router = Router();

router.post('/registor',Controller.registor);
router.post('/login',Controller.login);

export default router;