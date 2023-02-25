import { Listener, Subjects, TicketCreateEvent } from "@joise/common";
import { Message } from "node-nats-streaming";
import { QUEUE_GROUP_NAME } from "../config";
import { Ticket } from "../models";

export class TicketCreatedListener extends Listener<TicketCreateEvent> {
  subject: Subjects.TICKET_CREATED = Subjects.TICKET_CREATED;
  queueGroupName = QUEUE_GROUP_NAME;

  async onMessage(
    { title, price, id }: TicketCreateEvent["data"],
    msg: Message
  ) {
    const ticket = await Ticket.build({ title, price, id });
    await ticket.save();

    msg.ack();
  }
}
