import { Document, Model, model, Schema } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

type TicketAttrs = {
  title: string;
  price: number;
  userId: string;
};

type TicketDocument = TicketAttrs &
  Document & {
    version: number;
    orderId?: string;
  };
type TicketModel = Model<TicketDocument> & {
  build(attrs: TicketAttrs): TicketDocument;
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
    },
    userId: {
      type: Schema.Types.String,
      required: true,
    },
    orderId: {
      type: Schema.Types.String,
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

ticketSchema.statics.build = function build(attrs: TicketAttrs) {
  return new Ticket(attrs);
};

export const Ticket = model<TicketDocument, TicketModel>(
  "Ticket",
  ticketSchema
);
