import { Subjects } from "../../../config";

export type TicketUpdateEvent = {
  subject: Subjects.TICKET_UPDATED;
  data: {
    id: string;
    title: string;
    price: number;
    version: number;
    userId: string;
    orderId?: string;
  };
};
