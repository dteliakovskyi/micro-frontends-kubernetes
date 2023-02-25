import { Document, Model, model, Schema } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { Order, OrderDocument, OrderStatus } from "./order";

export type TicketAttrs = {
  id: string;
  title: string;
  price: number;
};

export type TicketDocument = TicketAttrs &
  Document & {
    version: string;
    isReserved(): Promise<boolean>;
  };
export type TicketModel = Model<TicketDocument> & {
  build(attrs: TicketAttrs): TicketDocument;
  findByEvent(event: { id: string; version: number }): Promise<TicketDocument>;
};

const ticketSchema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      required: true,
    },
    price: {
      type: Schema.Types.Number,
      required: true,
      min: 0,
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

ticketSchema.set("versionKey", "version");
ticketSchema.plugin(updateIfCurrentPlugin);

ticketSchema.statics.findByEvent = async function (event: {
  id: string;
  version: number;
}) {
  return Ticket.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};

ticketSchema.statics.build = function (attrs: TicketAttrs) {
  return new Ticket({
    ...attrs,
    _id: attrs.id,
  });
};

ticketSchema.methods.isReserved = async function () {
  const existingOrder = await Order.findOne({
    ticket: this,
    status: {
      $in: [
        OrderStatus.CREATED,
        OrderStatus.AWAITING_PAYMENT,
        OrderStatus.COMPLETED,
      ],
    },
  });

  return !!existingOrder;
};

export const Ticket = model<TicketDocument, TicketModel>(
  "Ticket",
  ticketSchema
);
