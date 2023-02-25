import { Document, Model, model, Schema } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

type PaymentAttrs = {
  orderId: string;
  chargeId: string;
};

export type PaymentDocument = PaymentAttrs &
  Document & {
    version: string;
  };
export type PaymentModel = Model<PaymentDocument> & {
  build(attrs: PaymentAttrs): PaymentDocument;
};

const paymentSchema = new Schema(
  {
    orderId: {
      type: Schema.Types.String,
      required: true,
    },
    chargeId: {
      type: Schema.Types.String,
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

paymentSchema.set("versionKey", "version");
paymentSchema.plugin(updateIfCurrentPlugin);

paymentSchema.statics.findByEvent = async function (event: {
  id: string;
  version: number;
}) {
  return Payment.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};

paymentSchema.statics.build = function (attrs: PaymentAttrs) {
  return new Payment(attrs);
};

export const Payment = model<PaymentDocument, PaymentModel>(
  "Payment",
  paymentSchema
);
