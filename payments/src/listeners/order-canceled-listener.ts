import {
  Listener,
  NotFoundError,
  OrderCancelEvent,
  Subjects,
} from "@joise/common";
import { Message } from "node-nats-streaming";
import { OrderStatus, QUEUE_GROUP_NAME } from "../config";
import { Order } from "../models";

export class OrderCanceledListener extends Listener<OrderCancelEvent> {
  subject: Subjects.ORDER_CANCELED = Subjects.ORDER_CANCELED;
  queueGroupName = QUEUE_GROUP_NAME;

  async onMessage({ id, version }: OrderCancelEvent["data"], msg: Message) {
    const order = await Order.findByEvent({ id, version });

    if (!order) {
      throw new NotFoundError("Order not found");
    }

    order.set({ status: OrderStatus.CANCELED });
    await order.save();

    msg.ack();
  }
}
