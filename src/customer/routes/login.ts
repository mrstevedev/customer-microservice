import { Request, Response, Router } from "express";
const router = Router();

import { checkSchema } from "express-validator";

import { loginControllerClass } from "@controllers/index";
import { loginValidationSchema } from "@validators/LoginValidationSchema";

router.post(
  "/",
  checkSchema(loginValidationSchema),
  (req: Request, res: Response) => loginControllerClass.handle(req, res)
);

export default router;
