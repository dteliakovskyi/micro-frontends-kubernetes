/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextFunction, Request, Response, Router } from "express";
import { body } from "express-validator";
import { sign } from "jsonwebtoken";

import { BadRequestError, validateRequest } from "@joise/common";
import { User } from "../models/User";

const signupRouter = Router();

signupRouter.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4 })
      .withMessage("Password should be unless 4 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(new BadRequestError("Email in use"));
    }

    const user = User.build({ email, password });
    await user.save();

    const userJWT = sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJWT,
    };

    return res.status(201).send({ user: user.email });
  }
);

export { signupRouter };
