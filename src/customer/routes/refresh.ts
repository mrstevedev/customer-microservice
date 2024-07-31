import { Router } from "express";
const router = Router();

import { refreshControllerClass } from "@controllers/index";
router.get("/", (req, res) => refreshControllerClass.handle(req, res));

export default router;
