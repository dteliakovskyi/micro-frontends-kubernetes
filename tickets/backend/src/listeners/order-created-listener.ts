import {
  Listener,
  NotFoundError,
  OrderCreateEvent,
  Subjects,
  TicketUpdatePublisher,
} from "@joise/common";
import { Message } from "node-nats-streaming";
import { QUEUE_GROUP_NAME } from "../config";
import { Ticket } from "../models/ticket";

export class OrderCreatedListener extends Listener<OrderCreateEvent> {
  subject: Subjects.ORDER_CREATED = Subjects.ORDER_CREATED;
  queueGroupName = QUEUE_GROUP_NAME;

  async onMessage(data: OrderCreateEvent["data"], msg: Message) {
    const ticket = await Ticket.findById(data.ticket.id);

    if (!ticket) {
      throw new NotFoundError("Ticket not found");
    }

    ticket.set({ orderId: data.id });
    await ticket.save();

    new TicketUpdatePublisher(this.stan).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      version: ticket.version,
      userId: ticket.userId,
      orderId: ticket.orderId,
    });

    msg.ack();
  }
}
