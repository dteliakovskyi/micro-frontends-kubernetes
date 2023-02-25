import { Subjects } from "../../../config";
import { Publisher } from "../../../models";
import { TicketUpdateEvent } from "../events";

export class TicketUpdatePublisher extends Publisher<TicketUpdateEvent> {
  subject: Subjects.TICKET_UPDATED = Subjects.TICKET_UPDATED;
}
