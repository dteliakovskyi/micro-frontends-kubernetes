import { Subjects } from "../../../config";

export type OrderCreateEvent = {
  subject: Subjects.ORDER_CREATED;
  data: {
    id: string;
    status: string;
    userId: string;
    expiresAt: string;
    version: number;
    ticket: {
      id: string;
      price: number;
    };
  };
};
