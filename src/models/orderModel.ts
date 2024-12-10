import { Document, model, Schema } from "mongoose";

export interface OrderInterface extends Document {
  customer: Schema.Types.ObjectId;
  products: Schema.Types.ObjectId[];
  status: "pending" | "completed" | "cancelled";
  total: string;
  quantity: string;
  address: string;
  paymentMethod: "cash" | "card" | "online";
  date: Date;
}

const orderSchema = new Schema<OrderInterface>({
  customer: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true, // Ensures every order is linked to a customer
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true, // Prevents empty product lists
    },
  ],
  status: {
    type: String,
    enum: ["pending", "completed", "cancelled"], // Ensures status is one of these
    default: "pending",
  },
  total: {
    type: String,
    required: true,
    min: 0, // Total cannot be negative
  },
  quantity: {
    type: String,
    required: true,
    min: 1, // At least one product must be ordered
  },
  address: {
    type: String,
    required: true,
    trim: true, // Removes unnecessary spaces
  },
  paymentMethod: {
    type: String,
    enum: ["cash", "card", "online"], // Restricts to specific payment methods
    default: "cash",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Order = model<OrderInterface>("Order", orderSchema);

export default Order;
