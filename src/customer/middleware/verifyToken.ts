import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ERROR } from "@constants/constants";

const verifyJWT = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const access = process.env.ACCESS_TOKEN_SECRET as string;
  const authorizationHeader = request.headers["authorization"];
  if (!authorizationHeader) return response.sendStatus(401);
  const token = authorizationHeader.split(" ")[1];

  jwt.verify(token, access, (err) => {
    if (err) {
      return response.status(403).json({ error: ERROR.ERROR_TOKEN_EXPIRED });
    }
    next();
  });
};

export default verifyJWT;
