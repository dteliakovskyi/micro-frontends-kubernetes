import {
  ExpirationCompleteEvent,
  Listener,
  NotFoundError,
  OrderCancelPublisher,
  Subjects,
} from "@joise/common";
import { Message } from "node-nats-streaming";
import { QUEUE_GROUP_NAME } from "../config";
import { Order, OrderStatus } from "../models";

export class ExpirationCompletedListener extends Listener<ExpirationCompleteEvent> {
  subject: Subjects.EXPIRATION_COMPLETED = Subjects.EXPIRATION_COMPLETED;
  queueGroupName = QUEUE_GROUP_NAME;

  async onMessage({ orderId }: ExpirationCompleteEvent["data"], msg: Message) {
    const order = await Order.findById(orderId).populate("ticket");

    if (!order) {
      throw new NotFoundError("Order not found");
    }

    order.set({ status: OrderStatus.CANCELED });
    await order.save();

    new OrderCancelPublisher(this.stan).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });

    msg.ack();
  }
}
