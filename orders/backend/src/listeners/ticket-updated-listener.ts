import {
  Listener,
  NotFoundError,
  Subjects,
  TicketUpdateEvent,
} from "@joise/common";
import { Message } from "node-nats-streaming";
import { QUEUE_GROUP_NAME } from "../config";
import { Ticket } from "../models";

export class TicketUpdatedListener extends Listener<TicketUpdateEvent> {
  subject: Subjects.TICKET_UPDATED = Subjects.TICKET_UPDATED;
  queueGroupName = QUEUE_GROUP_NAME;

  async onMessage(
    { id, version, price, title, orderId }: TicketUpdateEvent["data"],
    msg: Message
  ) {
    const ticket = await Ticket.findByEvent({ id, version });

    if (!ticket) {
      throw new NotFoundError("Ticket not found");
    }

    ticket.set({ title, price, orderId });
    await ticket.save();

    msg.ack();
  }
}
