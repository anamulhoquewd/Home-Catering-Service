import Manager from "../models/managerModel.js";
import bcrypt from "bcrypt";
import { sign } from "hono/jwt";
import { v2 as cloudinary } from "cloudinary";
import {
  deleteImageFromCloudinary,
  extractPublicId,
} from "../utils/deleteFile.js";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const getAllManagers = async (c: any) => {
  try {
    const document = await Manager.find({});

    if (document.length === 0) {
      return c.json({ message: "No managers found" }, 404);
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

const getManagerById = async (c: any) => {
  try {
    const document = await Manager.findById(c.req.param("id"));

    if (!document) {
      return c.json({ message: "Manager not found" }, 404);
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

const getManager = async (c: any) => {
  const manager = c.get("manager");

  if (!manager) {
    return c.json({ message: "Unauthorized: manager not authenticated" }, 401);
  }

  try {
    const document = await Manager.findById(manager._id);

    if (!document) {
      return c.json({ message: "manager not found" }, 404);
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

const createManager = async (c: any) => {
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

  if (!name || !email || !password || !phone || !address || !role || !NID) {
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

  const existingUser = await Manager.findOne({
    $or: [{ email }, { NID }, { phone }],
  });

  if (existingUser) {
    return c.json({ message: "Manager Already Exists", field: "email" }, 400);
  }

  if (role !== "manager") {
    return c.json(
      { message: "Manager Role must be 'manager'", field: "role" },
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

    const newUser = new Manager({
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

const loginManager = async (c: any) => {
  try {
    const body = await c.req.json();
    const { email, password } = body;

    const user = await Manager.findOne({ email });

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
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24hours
      },
      process.env.JWT_SECRET!
    );
    return c.json({ token, user: user.toObject() }, 200);
  } catch (error) {
    console.log(error);
    return c.json({ message: "Internal Server Error" }, 500);
  }
};

const updateManager = async (c: any) => {
  const body = await c.req.json();
  const { id } = c.req.param();

  try {
    const user = await Manager.findById(id);

    if (!user) {
      return c.json({ message: "Manager not found" }, 404);
    }

    const document = await Manager.findByIdAndUpdate(id, body, {
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

const deleteManager = async (c: any) => {
  const { id } = c.req.param();

  try {
    const user = await Manager.findById(id);

    if (!user) {
      return c.json({ message: "Manager not found" }, 404);
    }

    const deletedUser = await Manager.findByIdAndDelete(id);

    const publicId = extractPublicId(user.avatar!);
    await deleteImageFromCloudinary(publicId);

    return c.json(
      { message: "Manager deleted successfully", deletedUser },
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
  getAllManagers,
  getManagerById,
  createManager,
  loginManager,
  updateManager,
  deleteManager,
  getManager,
};
