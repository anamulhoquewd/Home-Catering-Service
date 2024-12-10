import { Document, model, Schema } from "mongoose";

export interface DeliveryManInterface extends Document {
  name: string;
  email: string;
  phone: string;
  secondaryPhone: string;
  address: string;
  isActive: boolean;
  role: "delivery_man";
  NID: string;
  avatar?: string;
  password: string;
}

const deliveryManSchema = new Schema<DeliveryManInterface>(
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
    secondaryPhone: {
      type: String,
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
      required: true,
    },
    NID: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

const DeliveryMan = model<DeliveryManInterface>("DeliveryMan", deliveryManSchema);

export default DeliveryMan;
