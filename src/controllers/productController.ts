import Product from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";
import {
  deleteImageFromCloudinary,
  deleteImagesFromCloudinary,
  extractPublicId,
} from "../utils/deleteFile.js";

const getAllProducts = async (c: any) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      return c.json({ message: "No products found" }, 404);
    }

    return c.json(
      products.map((doc) => doc.toObject()),
      200
    );
  } catch (error) {
    console.log(error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return c.json(
      { message: "Internal Server Error", error: errorMessage },
      500
    );
  }
};

const getProductById = async (c: any) => {
  const { id } = c.req.param();

  try {
    const product = await Product.findById(id);
    if (!product) return c.json({ message: "Product not found" }, 404);
    return c.json(product.toObject(), 200);
  } catch (error) {
    console.log(error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return c.json(
      { message: "Internal Server Error", error: errorMessage },
      500
    );
  }
};

const createProduct = async (c: any) => {
  const body = await c.req.formData();

  const name = body.get("name");
  const description = body.get("description");
  const price = body.get("price");
  const discount = body.get("discount");
  const stock = body.get("stock");
  const images = body.getAll("files");

  if (images.length === 0) {
    return c.json({ message: "No images uploaded" }, 400);
  }

  if (!name || !description || !price || !stock || !images) {
    return c.json(
      {
        message: `Bad Request. Missing ${
          !name
            ? "name"
            : !description
            ? "description"
            : !price
            ? "price"
            : !stock
            ? "stock"
            : !images
            ? "images"
            : ""
        }`,
        field: !name
          ? "name"
          : !description
          ? "description"
          : !price
          ? "price"
          : !stock
          ? "stock"
          : !images
          ? "images"
          : "",
      },
      400
    );
  }

  try {
    const uploadPromises = images.map(async (image: File) => {
      if (!(image instanceof File)) {
        throw new Error("Invalid file type");
      }

      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Upload to Cloudinary
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "home-catering-service/products" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(buffer); // Buffer
      });
    });

    const uploadResults = await Promise.all(uploadPromises);

    // Return the URLs of the uploaded files
    const fileUrls = uploadResults.map((result) => result.secure_url);

    const newUser = new Product({
      name,
      description,
      price,
      discount,
      stock,
      images: fileUrls,
    });

    const document = await newUser.save();

    return c.json(document?.toObject(), 201);
  } catch (error) {
    console.log(error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return c.json(
      { message: "Internal Server Error", error: errorMessage },
      500
    );
  }
};

const updateProduct = async (c: any) => {
  const body = await c.req.formData();
  const { id } = c.req.param();

  const user = await Product.findById(id);

  if (!user) {
    return c.json({ message: "Product not found" }, 404);
  }

  const name = body.get("name");
  const description = body.get("description");
  const price = body.get("price");
  const discount = body.get("discount");
  const stock = body.get("stock");
  const images = body.getAll("files");

  try {
    const uploadPromises = images.map(async (image: File) => {
      if (!(image instanceof File)) {
        throw new Error("Invalid file type");
      }

      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Upload to Cloudinary
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "home-catering-service/products" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(buffer); // Buffer
      });
    });

    const uploadResults = await Promise.all(uploadPromises);

    // Return the URLs of the uploaded files
    const fileUrls = uploadResults.map((result) => result.secure_url);

    if (fileUrls.length > 0) {
      deleteImagesFromCloudinary(user.images!);
    }

    const document = await Product.findByIdAndUpdate(
      id,
      {
        name: name || user.name,
        description: description || user.description,
        price: price || user.price,
        discount: discount || user.discount,
        stock: stock || user.stock,
        images: fileUrls.length > 0 ? fileUrls : user.images,
      },
      {
        new: true,
      }
    );

    return c.json(document?.toObject(), 200);
  } catch (error) {
    console.log(error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return c.json(
      { message: "Internal Server Error", error: errorMessage },
      500
    );
  }
};

const deleteProduct = async (c: any) => {
  const { id } = c.req.param();

  try {
    const user = await Product.findById(id);

    if (!user) {
      return c.json({ message: "Product not found" }, 404);
    }

    const deletedUser = await Product.findByIdAndDelete(id);

    deleteImagesFromCloudinary(user.images!);

    return c.json(
      { message: "Product deleted successfully", deletedUser },
      200
    );
  } catch (error) {
    console.log(error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return c.json(
      { message: "Internal Server Error", error: errorMessage },
      500
    );
  }
};

export {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
