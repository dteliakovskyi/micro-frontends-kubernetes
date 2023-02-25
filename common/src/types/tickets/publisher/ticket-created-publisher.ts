import { Subjects } from "../../../config";
import { Publisher } from "../../../models";
import { TicketCreateEvent } from "../events";

export class TicketCreatedPublisher extends Publisher<TicketCreateEvent> {
  subject: Subjects.TICKET_CREATED = Subjects.TICKET_CREATED;
}
