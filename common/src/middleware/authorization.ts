/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UserPayload } from "../../@types/express";

export function authorization(req: Request, res: Response, next: NextFunction) {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = verify(
      req.session?.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;

    req.currentUser = payload;
  } catch (error) {
    console.error(error);
  }

  next();
}
