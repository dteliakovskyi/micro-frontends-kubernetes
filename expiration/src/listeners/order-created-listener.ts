import { Listener, OrderCreateEvent, Subjects } from "@joise/common";
import { Message } from "node-nats-streaming";
import { QUEUE_GROUP_NAME } from "../config";
import { expirationQueue } from "../queues";

export class OrderCreatedListener extends Listener<OrderCreateEvent> {
  subject: Subjects.ORDER_CREATED = Subjects.ORDER_CREATED;
  queueGroupName = QUEUE_GROUP_NAME;

  async onMessage({ id, expiresAt }: OrderCreateEvent["data"], msg: Message) {
    const delay = new Date(expiresAt).getTime() - new Date().getTime();

    await expirationQueue.add({ orderId: id }, { delay });

    msg.ack();
  }
}
