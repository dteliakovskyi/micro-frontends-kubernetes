import { requireAuth } from "@joise/common";
import { Request, Response, Router } from "express";
import { Ticket } from "../models/ticket";

const showTicketRouter = Router();

showTicketRouter.get("/api/tickets", async (_req: Request, res: Response) => {
  const tickets = await Ticket.find({
    orderId: undefined,
  });

  res.status(200).send({ tickets });
});

export { showTicketRouter };
