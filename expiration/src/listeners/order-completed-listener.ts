import {
  Listener,
  OrderCompleteEvent,
  OrderCreateEvent,
  Subjects,
} from "@joise/common";
import { Message } from "node-nats-streaming";
import { QUEUE_GROUP_NAME } from "../config";
import { expirationQueue } from "../queues";

export class OrderCompletedListener extends Listener<OrderCompleteEvent> {
  subject: Subjects.ORDER_COMPLETED = Subjects.ORDER_COMPLETED;
  queueGroupName = QUEUE_GROUP_NAME;

  async onMessage({ id }: OrderCompleteEvent["data"], msg: Message) {
    const delayedJob = await expirationQueue.getDelayed();
    const expiringOrder = delayedJob.find((job) => job.data.orderId === id);

    if (expiringOrder) {
      expiringOrder.remove();
    }

    msg.ack();
  }
}
