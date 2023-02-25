import { Subjects } from "../../../config";
import { Publisher } from "../../../models";
import { OrderCompleteEvent } from "../events";

export class OrderCompletedPublisher extends Publisher<OrderCompleteEvent> {
  subject: Subjects.ORDER_COMPLETED = Subjects.ORDER_COMPLETED;
}
