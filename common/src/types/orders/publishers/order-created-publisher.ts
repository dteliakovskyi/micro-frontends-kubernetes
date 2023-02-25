import { Subjects } from "../../../config";
import { Publisher } from "../../../models";
import { OrderCreateEvent } from "../events";

export class OrderCreatedPublisher extends Publisher<OrderCreateEvent> {
  subject: Subjects.ORDER_CREATED = Subjects.ORDER_CREATED;
}
