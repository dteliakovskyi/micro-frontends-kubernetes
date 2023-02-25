import {
  Listener,
  NotFoundError,
  OrderCancelEvent,
  Subjects,
  TicketUpdatePublisher,
} from "@joise/common";
import { Message } from "node-nats-streaming";
import { QUEUE_GROUP_NAME } from "../config";
import { Ticket } from "../models/ticket";

export class OrderCanceledListener extends Listener<OrderCancelEvent> {
  subject: Subjects.ORDER_CANCELED = Subjects.ORDER_CANCELED;
  queueGroupName = QUEUE_GROUP_NAME;

  async onMessage(data: OrderCancelEvent["data"], msg: Message) {
    const ticket = await Ticket.findById(data.ticket.id);

    if (!ticket) {
      throw new NotFoundError("Ticket not found");
    }

    ticket.set({ orderId: undefined });
    await ticket.save();

    new TicketUpdatePublisher(this.stan).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      version: ticket.version,
      orderId: ticket.orderId,
      userId: ticket.userId,
    });

    msg.ack();
  }
}
