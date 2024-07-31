import express, { Request, Response, NextFunction } from "express";
import { ERROR } from "@constants/constants";

const parseJSON = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const errorHandler = (error: Error | null) => {
    if (error instanceof Error) {
      return response.status(400).json({ errors: ERROR.ERROR_INVALID_JSON });
    }
    next();
  };
  express.json()(request, response, errorHandler);
};

export default parseJSON;
