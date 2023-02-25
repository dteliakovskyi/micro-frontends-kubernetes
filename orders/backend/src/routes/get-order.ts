import { NotAuthorizedError, NotFoundError, requireAuth } from "@joise/common";
import { NextFunction, Request, Response, Router } from "express";
import { Order } from "../models";

const getOrderRouter = Router();

getOrderRouter.get(
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

    res.status(200).send({ order });
  }
);

export { getOrderRouter };
