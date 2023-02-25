import {
  BadRequestError,
  natsMQ,
  NotAuthorizedError,
  NotFoundError,
  PaymentCreatedPublisher,
  requireAuth,
  validateRequest,
} from "@joise/common";
import { NextFunction, Request, Response, Router } from "express";
import { body } from "express-validator";
import { OrderStatus } from "../config";
import { Order, Payment } from "../models";
import { stripe } from "../stripe";

const createChargeRouter = Router();

createChargeRouter.post(
  "/api/payments",
  requireAuth,
  [
    body("token").notEmpty(),
    body("orderId").notEmpty().withMessage("OrderId is required"),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { orderId, token } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return next(new NotFoundError());
    } else if (order.userId !== req.currentUser.id) {
      return next(new NotAuthorizedError());
    } else if (order.status === OrderStatus.CANCELED) {
      return next(new BadRequestError("Order is canceled"));
    }

    const charge = await stripe.charges.create({
      currency: "pln",
      amount: order.price * 100,
      source: token,
    });

    const payment = Payment.build({ orderId, chargeId: charge.id });
    await payment.save();

    new PaymentCreatedPublisher(natsMQ.stan).publish({
      id: payment.id,
      orderId: payment.orderId,
      chargeId: payment.chargeId,
    });

    res.sendStatus(201);
  }
);

export { createChargeRouter };
