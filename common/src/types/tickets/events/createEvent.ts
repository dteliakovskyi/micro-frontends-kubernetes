import { Subjects } from "../../../config";

export type TicketCreateEvent = {
  subject: Subjects.TICKET_CREATED;
  data: {
    id: string;
    title: string;
    price: number;
    userId: string;
    version: number;
  };
};
