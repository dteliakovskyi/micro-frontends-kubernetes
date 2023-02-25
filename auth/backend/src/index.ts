import { errorHandler, InternalError, NotFoundError } from "@joise/common";
import cookieSession from "cookie-session";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

const app = express();

app.use(express.json());
app.use(
  cookieSession({
    signed: false,
  })
);

app.use(signoutRouter);
app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);

app.use(errorHandler);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  return next(new NotFoundError());
});

void (async () => {
  if (!process.env.JWT_KEY) {
    throw new InternalError("JWT_KEY must be defined");
  } else if (!process.env.MONGO_URI) {
    throw new InternalError("MONGO_URI must be defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    throw new InternalError("Error connecting to database");
  }

  app.listen("3000", () => {
    console.log("Listening on port 3000");
  });
})();
