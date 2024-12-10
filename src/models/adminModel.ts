import { Document, model, Schema } from "mongoose";

export interface AdminInterface extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: "admin";
  avatar?: string;
}

const adminSchema = new Schema<AdminInterface>(
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
    role: {
      type: String,
      default: "admin",
    },
    avatar: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Admin = model<AdminInterface>("Admin", adminSchema);

export default Admin;
