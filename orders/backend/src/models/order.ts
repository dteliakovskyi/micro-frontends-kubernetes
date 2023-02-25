import { Document, Model, model, Schema } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { OrderStatus } from "../config";
import { TicketDocument } from "./ticket";

type OrderAttrs = {
  status: OrderStatus;
  expiresAt: Date;
  userId: string;
  ticket: TicketDocument;
};

export type OrderDocument = OrderAttrs &
  Document & {
    version: number;
  };
export type OrderModel = Model<OrderDocument> & {
  build(attrs: OrderAttrs): OrderDocument;
};

const orderSchema = new Schema(
  {
    status: {
      type: Schema.Types.String,
      required: true,
      enum: Object.values(OrderStatus),
      default: OrderStatus.CREATED,
    },
    expiresAt: {
      type: Schema.Types.Date,
      required: true,
    },
    userId: {
      type: Schema.Types.String,
      required: true,
    },
    ticket: {
      type: Schema.Types.ObjectId,
      ref: "Ticket",
    },
  },
  {
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

orderSchema.set("versionKey", "version");
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = function (attrs: OrderAttrs) {
  return new Order(attrs);
};

const Order = model<OrderDocument, OrderModel>("Order", orderSchema);

export { Order, OrderStatus };
