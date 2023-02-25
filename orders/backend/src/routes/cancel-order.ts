import {
  natsMQ,
  NotAuthorizedError,
  NotFoundError,
  OrderCancelPublisher,
  requireAuth,
} from "@joise/common";
import { NextFunction, Request, Response, Router } from "express";
import { Order, OrderStatus } from "../models";

const cancelOrderRouter = Router();

cancelOrderRouter.patch(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const order = await Order.findById(req.params.orderId).populate("ticket");

    if (!order) {
      return next(new NotFoundError());
    }

    if (order.userId !== req.currentUser.id) {
      return next(new NotAuthorizedError());
    }

    order.set({ status: OrderStatus.CANCELED });
    await order.save();

    new OrderCancelPublisher(natsMQ.stan).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });

    res.status(204).send({ order });
  }
);

export { cancelOrderRouter };
