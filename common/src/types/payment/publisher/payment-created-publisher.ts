import { Subjects } from "../../../config";
import { Publisher } from "../../../models";
import { PaymentCreateEvent } from "../events";

export class PaymentCreatedPublisher extends Publisher<PaymentCreateEvent> {
  subject: Subjects.PAYMENT_CREATED = Subjects.PAYMENT_CREATED;
}
