import { Subjects } from "../../../config";
import { Publisher } from "../../../models";
import { OrderCancelEvent } from "../events";

export class OrderCancelPublisher extends Publisher<OrderCancelEvent> {
  subject: Subjects.ORDER_CANCELED = Subjects.ORDER_CANCELED;
}
