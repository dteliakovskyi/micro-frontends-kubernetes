import { Subjects } from "../../../config";

export type OrderCancelEvent = {
  subject: Subjects.ORDER_CANCELED;
  data: {
    id: string;
    version: number;
    ticket: {
      id: string;
    };
  };
};
