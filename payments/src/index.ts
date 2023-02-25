import {
  authorization,
  errorHandler,
  InternalError,
  natsMQ,
  NotFoundError,
} from "@joise/common";
import cookieSession from "cookie-session";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { OrderCanceledListener, OrderCreatedListener } from "./listeners";
import { createChargeRouter } from "./routes";

const app = express();

app.use(express.json());
app.use(
  cookieSession({
    signed: false,
  })
);
app.use(authorization);
app.use(createChargeRouter);
app.use(errorHandler);

app.all("*", (_req: Request, _res: Response, next: NextFunction) => {
  return next(new NotFoundError());
});

void (async () => {
  if (!process.env.JWT_KEY) {
    throw new InternalError("JWT_KEY must be defined");
  } else if (!process.env.MONGO_URI) {
    throw new InternalError("MONGO_URI must be defined");
  } else if (!process.env.NATS_URL) {
    throw new InternalError("NATS_URL must be defined");
  } else if (!process.env.NATS_CLUSTER_ID) {
    throw new InternalError("NATS_CLUSTER_ID must be defined");
  } else if (!process.env.NATS_CLIENT_ID) {
    throw new InternalError("NATS_CLIENT_ID must be defined");
  }

  try {
    await natsMQ.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    console.log("Connected to NATS");

    new OrderCreatedListener(natsMQ.stan).listen();
    new OrderCanceledListener(natsMQ.stan).listen();
  } catch (err) {
    throw new InternalError("Error connecting to NATS Streaming Server");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    throw new InternalError("Error connecting to database");
  }

  app.listen("3000", () => {
    console.log("Listening on port 3000");
  });
})();
