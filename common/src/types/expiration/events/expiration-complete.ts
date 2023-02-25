import { Subjects } from "../../../config";

export interface ExpirationCompleteEvent {
  subject: Subjects.EXPIRATION_COMPLETED;
  data: {
    orderId: string;
  };
}
