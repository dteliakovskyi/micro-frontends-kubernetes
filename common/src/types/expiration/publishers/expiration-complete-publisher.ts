import { Subjects } from "../../../config";
import { Publisher } from "../../../models";
import { ExpirationCompleteEvent } from "../events/expiration-complete";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.EXPIRATION_COMPLETED = Subjects.EXPIRATION_COMPLETED;
}
