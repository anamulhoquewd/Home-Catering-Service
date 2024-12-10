import { Document, model, Schema } from "mongoose";

export interface CustomerInterface extends Document {
  name: string;
  email: string;
  phone: string;
  address: string;
  isActive: boolean;
  role: "customer";
  avatar?: string;
  password: string;
}

const customerSchema = new Schema<CustomerInterface>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      default: "customer",
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

const Customer = model<CustomerInterface>("Customer", customerSchema);

export default Customer;
