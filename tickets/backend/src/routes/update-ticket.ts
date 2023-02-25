import {
  BadRequestError,
  natsMQ,
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  TicketUpdatePublisher,
  validateRequest,
} from "@joise/common";
import { NextFunction, Request, Response, Router } from "express";
import { body } from "express-validator";
import { Ticket } from "../models/ticket";

const updateTicketRouter = Router();

updateTicketRouter.put(
  "/api/tickets/:id",
  requireAuth,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater that 0"),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, price } = req.body;

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return next(new NotFoundError());
    }

    if (ticket.orderId) {
      return next(new BadRequestError("Can not edit a reserved ticket"));
    }

    if (ticket.userId !== req.currentUser.id) {
      return next(new NotAuthorizedError());
    }

    ticket.set({
      title,
      price,
    });

    await ticket.save();

    await new TicketUpdatePublisher(natsMQ.stan).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
    });

    res.status(200).send({ ticket });
  }
);

export { updateTicketRouter };
