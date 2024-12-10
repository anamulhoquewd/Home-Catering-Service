import Admin from "../models/adminModel.js";
import bcrypt from "bcrypt";
import { sign } from "hono/jwt";

const getAdmin = async (c: any) => {
  try {
    const document = await Admin.findById(c.req.param("id"));

    if (!document) {
      return c.json({ message: "Admin not found" }, 404);
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

const loginAdmin = async (c: any) => {
  const body = await c.req.json();
  const { email, password } = body;

  try {
    const user = await Admin.findOne({ email });

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
        // exp: Math.floor(Date.now() / 1000) + 60 * 60 * 6, // 6 hours
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

const updateAdmin = async (c: any) => {
  const { id } = c.req.param();

  const body = await c.req.json();

  try {
    const document = await Admin.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!document) {
      return c.json({ message: "Admin not found" }, 404);
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

export { getAdmin, loginAdmin, updateAdmin };
