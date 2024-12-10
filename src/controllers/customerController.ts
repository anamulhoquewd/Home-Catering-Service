import bcrypt from "bcrypt";
import { sign } from "hono/jwt";
import Customer from "../models/customerModel.js";
import { v2 as cloudinary } from "cloudinary";
import {
  deleteImageFromCloudinary,
  extractPublicId,
} from "../utils/deleteFile.js";

const getAllCustomers = async (c: any) => {
  try {
    const document = await Customer.find({});

    if (document.length === 0) {
      return c.json({ message: "No Customers found" }, 404);
    }

    return c.json(
      document.map((doc) => doc.toObject()),
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

const getCustomerById = async (c: any) => {
  try {
    const document = await Customer.findById(c.req.param("id"));

    if (!document) {
      return c.json({ message: "Customers not found" }, 404);
    }

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

const getCustomer = async (c: any) => {
  const customer = c.get("customer");

  if (!customer) {
    return c.json({ message: "Unauthorized: Customer not authenticated" }, 401);
  }

  try {
    const document = await Customer.findById(customer._id);

    if (!document) {
      return c.json({ message: "Customer not found" }, 404);
    }

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

const createCustomer = async (c: any) => {
  const body = await c.req.formData();

  const name = body.get("name");
  const email = body.get("email");
  const password = body.get("password");
  const phone = body.get("phone");
  const address = body.get("address");
  const role = body.get("role");
  const file = body.get("file");
  const isActive = body.get("isActive");

  if (file) {
    if (!(file instanceof File)) {
      return c.json({ message: "Invalid file type" }, 400);
    }
  }

  if (!name || !email || !password || !phone || !address || !role) {
    return c.json(
      {
        message: `Bad Request. Missing ${
          !name
            ? "name"
            : !email
            ? "email"
            : !password
            ? "password"
            : !phone
            ? "phone"
            : !address
            ? "address"
            : !role
            ? "role"
            : ""
        }`,
        field: !name
          ? "name"
          : !email
          ? "email"
          : !password
          ? "password"
          : !phone
          ? "phone"
          : !address
          ? "address"
          : !role
          ? "role"
          : "",
      },
      400
    );
  }

  const existingUser = await Customer.findOne({
    $or: [{ email }, { phone }],
  });

  if (existingUser) {
    return c.json({ message: "Customer Already Exists", field: "email" }, 400);
  }

  if (role !== "customer") {
    return c.json(
      { message: "Customers Role must be 'customer'", field: "role" },
      400
    );
  }

  try {
    // Buffer from file blob
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Cloudinary Upload
    const uploadResult = (await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "home-catering-service/products" },
        (error, result) => {
          if (error) reject(error);
          else if (result) resolve(result);
          else reject(new Error("Result is undefined"));
        }
      );
      stream.end(buffer); // send buffer
    })) as { secure_url: string };

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Customer({
      name,
      email,
      phone,
      address,
      role,
      isActive: isActive ? isActive : true,
      password: hashedPassword,
      avatar: uploadResult.secure_url,
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

const loginCustomer = async (c: any) => {
  const body = await c.req.json();
  const { email, password } = body;

  try {
    const user = await Customer.findOne({ email });

    if (!user) {
      return c.json({ message: "Invalid Credentials", field: "email" }, 404);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return c.json({ message: "Invalid Credentials", field: "password" }, 404);
    }

    const token = await sign(
      {
        id: user._id,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hours
      },
      process.env.JWT_SECRET!
    );
    return c.json({ token, user: user.toObject() }, 200);
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

const updateCustomer = async (c: any) => {
  const { id } = c.req.param();

  const body = await c.req.json();

  try {
    const user = await Customer.findById(id);

    if (!user) {
      return c.json({ message: "Customer not found" }, 404);
    }

    const document = await Customer.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!document) {
      return c.json({ message: "Update failed, customer not found" }, 404);
    }

    return c.json(
      { message: "Customer updated successfully", data: document.toObject() },
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

const deleteCustomer = async (c: any) => {
  const { id } = c.req.param();

  try {
    const user = await Customer.findById(id);

    if (!user) {
      return c.json({ message: "Customers not found" }, 404);
    }

    const deletedUser = await Customer.findByIdAndDelete(id);

    const publicId = extractPublicId(user.avatar!);
    await deleteImageFromCloudinary(publicId);

    return c.json(
      { message: "Customers deleted successfully", deletedUser },
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
  getAllCustomers,
  getCustomerById,
  createCustomer,
  loginCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomer,
};
