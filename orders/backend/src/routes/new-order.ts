import {
  BadRequestError,
  natsMQ,
  NotFoundError,
  OrderCreatedPublisher,
  requireAuth,
} from "@joise/common";
import { NextFunction, Request, Response, Router } from "express";
import { body } from "express-validator";
import { EXPIRATION_ORDER_TIME } from "../config";
import { Order, OrderStatus, Ticket } from "../models";

const newOrderRouter = Router();

newOrderRouter.post(
  "/api/orders",
  requireAuth,
  body("ticketId").notEmpty().withMessage("TicketId must be provided"),
  async (req: Request, res: Response, next: NextFunction) => {
    const { ticketId } = req.body;

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return next(new NotFoundError("Ticket not found"));
    }

    const isReserved = await ticket.isReserved();

    if (isReserved) {
      return next(new BadRequestError("Ticket is already reserved"));
    }

    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_ORDER_TIME);

    const order = Order.build({
      ticket,
      userId: req.currentUser.id,
      expiresAt: expiration,
      status: OrderStatus.CREATED,
    });

    await order.save();

    new OrderCreatedPublisher(natsMQ.stan).publish({
      id: order.id,
      status: order.status,
      userId: order.userId,
      expiresAt: order.expiresAt.toISOString(),
      version: order.version,
      ticket: {
        id: ticket.id,
        price: ticket.price,
      },
    });

    res.status(201).send({ order });
  }
);

export { newOrderRouter };
