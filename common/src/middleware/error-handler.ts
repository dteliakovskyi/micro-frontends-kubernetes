import { NextFunction, Request, Response } from "express";
import { CustomError } from "../models/error";

export function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error instanceof CustomError) {
    return res
      .status(error.statusCode)
      .json({ errors: error.serializeErrors() });
  }

  console.error(error);

  return res.status(400).json({ msg: "Something went wrong" });
}
