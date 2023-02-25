import { NextFunction, Request, Response, Router } from "express";
import { body } from "express-validator";
import { sign } from "jsonwebtoken";

import { BadRequestError, validateRequest } from "@joise/common";
import { User } from "../models/User";
import { Password } from "../services/password";

const signinRouter = Router();

signinRouter.post(
  "/api/users/signin",
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

    const user = await User.findOne({ email });

    if (!user) {
      return next(new BadRequestError("Invalid credentials"));
    }

    const passwordsMatches = await Password.compare(user.password, password);

    if (!passwordsMatches) {
      return next(new BadRequestError("Invalid credentials"));
    }

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

    return res.send({ user });
  }
);

export { signinRouter };
