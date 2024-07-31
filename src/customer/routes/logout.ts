import { Router } from "express";
const router = Router();

import { logoutControllerClass } from "@controllers/index";
router.get("/", (req, res) => logoutControllerClass.handle(req, res));

export default router;
