import { Subjects } from "../../../config";

export type OrderCompleteEvent = {
  subject: Subjects.ORDER_COMPLETED;
  data: {
    id: string;
    version: number;
    ticket: {
      id: string;
    };
  };
};
