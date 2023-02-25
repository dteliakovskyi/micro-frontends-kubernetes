import { Subjects } from "../../../config";

export type PaymentCreateEvent = {
  subject: Subjects.PAYMENT_CREATED;
  data: {
    id: string;
    orderId: string;
    chargeId: string;
  };
};
