import {
  Listener,
  NotFoundError,
  OrderCompletedPublisher,
  PaymentCreateEvent,
  Subjects,
} from "@joise/common";
import { Message } from "node-nats-streaming";
import { OrderStatus, QUEUE_GROUP_NAME } from "../config";
import { Order } from "../models";

export class PaymentCreatedListener extends Listener<PaymentCreateEvent> {
  subject: Subjects.PAYMENT_CREATED = Subjects.PAYMENT_CREATED;
  queueGroupName = QUEUE_GROUP_NAME;

  async onMessage({ orderId }: PaymentCreateEvent["data"], msg: Message) {
    const order = await Order.findById(orderId).populate("ticket");

    if (!order) {
      throw new NotFoundError("Order not found");
    }

    order.set({ status: OrderStatus.COMPLETED });
    await order.save();

    new OrderCompletedPublisher(this.stan).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });

    msg.ack();
  }
}
