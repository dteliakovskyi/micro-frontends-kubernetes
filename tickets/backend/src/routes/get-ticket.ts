import { NotFoundError, requireAuth } from "@joise/common";
import { NextFunction, Request, Response, Router } from "express";
import { Ticket } from "../models/ticket";

const getTicketRouter = Router();

getTicketRouter.get(
  "/api/tickets/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.params.id);
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return next(new NotFoundError());
    }
    res.status(200).send({ ticket });
  }
);

export { getTicketRouter };
