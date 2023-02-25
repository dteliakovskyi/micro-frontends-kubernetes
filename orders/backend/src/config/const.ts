export const EXPIRATION_ORDER_TIME = 10 * 10;
export const QUEUE_GROUP_NAME = "orders-service";

export enum OrderStatus {
  CREATED = "created",
  CANCELED = "canceled",
  AWAITING_PAYMENT = "awaiting:payment",
  COMPLETED = "completed",
}
