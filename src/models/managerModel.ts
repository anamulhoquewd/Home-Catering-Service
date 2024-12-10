import { Document, model, Schema } from "mongoose";

export interface ManagerInterface extends Document {
  name: string;
  email: string;
  phone: string;
  secondaryPhone?: string;
  address: string;
  isActive: boolean;
  role: "manager";
  NID: string;
  avatar?: string;
  password: string;
}

const managerSchema = new Schema<ManagerInterface>(
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
    NID: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

const Manager = model<ManagerInterface>("Manager", managerSchema);

export default Manager;
