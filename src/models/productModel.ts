import { Document, model, Schema } from "mongoose";

export interface ProductInterface extends Document {
  name: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  images: string[];
}

const productSchema = new Schema<ProductInterface>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: false,
    },
    stock: {
      type: Number,
      required: true,
    },
    images: {
      type: [String], // Array of image URLs
      required: true,
    },
  },
  { timestamps: true }
);

const Product = model<ProductInterface>("Product", productSchema);

export default Product;
