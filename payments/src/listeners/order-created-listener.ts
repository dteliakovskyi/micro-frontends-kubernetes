import { Listener, OrderCreateEvent, Subjects } from "@joise/common";
import { Message } from "node-nats-streaming";
import { QUEUE_GROUP_NAME } from "../config";
import { Order } from "../models";

export class OrderCreatedListener extends Listener<OrderCreateEvent> {
  subject: Subjects.ORDER_CREATED = Subjects.ORDER_CREATED;
  queueGroupName = QUEUE_GROUP_NAME;

  async onMessage(
    { id, userId, ticket, status, version }: OrderCreateEvent["data"],
    msg: Message
  ) {
    const order = await Order.build({
      price: ticket.price,
      id,
      userId,
      status,
      version,
    });

    await order.save();

    msg.ack();
  }
}
