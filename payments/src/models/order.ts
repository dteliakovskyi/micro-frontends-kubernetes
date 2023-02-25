import { Document, Model, model, Schema } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

type OrderAttrs = {
  id: string;
  userId: string;
  price: number;
  version: number;
  status: string;
};

export type OrderDocument = OrderAttrs &
  Document & {
    version: number;
  };
export type OrderModel = Model<OrderDocument> & {
  build(attrs: OrderAttrs): OrderDocument;
  findByEvent(event: { id: string; version: number }): Promise<OrderDocument>;
};

const orderSchema = new Schema(
  {
    status: {
      type: Schema.Types.String,
      required: true,
    },
    userId: {
      type: Schema.Types.String,
      required: true,
    },
    price: {
      type: Schema.Types.Number,
      required: true,
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

orderSchema.statics.findByEvent = async function (event: {
  id: string;
  version: number;
}) {
  return Order.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};

orderSchema.statics.build = function (attrs: OrderAttrs) {
  return new Order({
    _id: attrs.id,
    version: attrs.version,
    price: attrs.price,
    userId: attrs.userId,
    status: attrs.status,
  });
};

export const Order = model<OrderDocument, OrderModel>("Order", orderSchema);
