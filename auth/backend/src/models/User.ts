import { Document, Model, Schema, model } from "mongoose";
import { Password } from "../services/password";

type UserAttrs = {
  email: string;
  password: string;
};
type UserMethods = {
  build(attrs: UserAttrs): UserDocument;
};

type UserDocument = UserAttrs & Document;
type UserModel = Model<UserAttrs> & UserMethods;

const userSchema = new Schema<UserAttrs, UserModel, UserMethods>(
  {
    email: {
      type: Schema.Types.String,
      required: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
  },
  {
    toJSON: {
      versionKey: false,
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

userSchema.static("build", function build(attrs: UserAttrs) {
  return new User(attrs);
});

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashedPassword = await Password.hash(this.password);

    this.set("password", hashedPassword);

    done();
  }
});

export const User = model<UserAttrs, UserModel>("User", userSchema);
