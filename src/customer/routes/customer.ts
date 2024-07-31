import { Request, Response, Router } from "express";
const router = Router();

import { checkSchema } from "express-validator";
import verifyJWT from "@middleware/verifyToken";

import { createCustomerControllerClass } from "@controllers/index";
import { getCustomerControllerClass } from "@controllers/index";

import { createCustomerValidationSchema } from "@validators/CustomerValidationSchema";

router
  .post(
    "/",
    verifyJWT,
    checkSchema(createCustomerValidationSchema),
    (req: Request, res: Response) =>
      createCustomerControllerClass.handle(req, res)
  )
  .get("/", verifyJWT, (req, res) =>
    getCustomerControllerClass.handle(req, res)
  );

export default router;
