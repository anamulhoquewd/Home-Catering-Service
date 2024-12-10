import bcrypt from "bcrypt";
import { sign } from "hono/jwt";
import DeliveryMan from "../models/delivery_manModel.js";
import { v2 as cloudinary } from "cloudinary";
import {
  deleteImageFromCloudinary,
  extractPublicId,
} from "../utils/deleteFile.js";

const getAllDelivery_mans = async (c: any) => {
  try {
    const document = await DeliveryMan.find({});

    if (document.length === 0) {
      return c.json({ message: "No Delivery Man found" }, 404);
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

const getDelivery_manById = async (c: any) => {
  try {
    const document = await DeliveryMan.findById(c.req.param("id"));

    if (!document) {
      return c.json({ message: "Delivery Man not found" }, 404);
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

const getDeliveryMan = async (c: any) => {
  const deliveryMan = c.get("delivery_man");

  if (!deliveryMan) {
    return c.json(
      { message: "Unauthorized: Delivery Man not authenticated" },
      401
    );
  }

  try {
    const document = await DeliveryMan.findById(deliveryMan._id);

    if (!document) {
      return c.json({ message: "Delivery Man not found" }, 404);
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

const createDelivery_man = async (c: any) => {
  const body = await c.req.formData();

  const name = body.get("name");
  const email = body.get("email");
  const password = body.get("password");
  const phone = body.get("phone");
  const address = body.get("address");
  const role = body.get("role");
  const NID = body.get("NID");
  const file = body.get("file");
  const isActive = body.get("isActive");

  if (file) {
    if (!(file instanceof File)) {
      return c.json({ message: "Invalid file type" }, 400);
    }
  }

  if (!name || !email || !password || !phone || !NID || !address || !role) {
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
            : !NID
            ? "NID"
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
          : !NID
          ? "NID"
          : "",
      },
      400
    );
  }

  const existingUser = await DeliveryMan.findOne({
    $or: [{ email }, { NID }, { phone }],
  });

  if (existingUser) {
    return c.json(
      { message: "Delivery Man Already Exists", field: "email" },
      400
    );
  }

  if (role !== "delivery_man") {
    return c.json(
      { message: "Delivery Man Role must be 'delivery_man'", field: "role" },
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

    const newUser = new DeliveryMan({
      name,
      email,
      phone,
      address,
      role,
      NID,
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

const loginDelivery_man = async (c: any) => {
  const body = await c.req.json();
  const { email, password } = body;

  try {
    const user = await DeliveryMan.findOne({ email });

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

const updateDelivery_man = async (c: any) => {
  const body = await c.req.json();
  const { id } = c.req.param();

  try {
    const user = await DeliveryMan.findById(id);

    if (!user) {
      return c.json({ message: "Delivery Man not found" }, 404);
    }

    const document = await DeliveryMan.findByIdAndUpdate(id, body, {
      new: true,
    });

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

const deleteDelivery_man = async (c: any) => {
  const { id } = c.req.param();

  try {
    const user = await DeliveryMan.findById(id);

    if (!user) {
      return c.json({ message: "Delivery Man not found" }, 404);
    }

    const deletedUser = await DeliveryMan.findByIdAndDelete(id);

    const publicId = extractPublicId(user.avatar!);
    await deleteImageFromCloudinary(publicId);

    return c.json(
      { message: "Delivery Man deleted successfully", deletedUser },
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
  getAllDelivery_mans,
  getDelivery_manById,
  createDelivery_man,
  loginDelivery_man,
  updateDelivery_man,
  deleteDelivery_man,
  getDeliveryMan,
};
