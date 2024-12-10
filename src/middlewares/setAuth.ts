import { verify } from "hono/jwt";
import Admin from "../models/adminModel.js";
import Manager from "../models/managerModel.js";
import Customer from "../models/customerModel.js";
import DeliveryMan from "../models/delivery_manModel.js";

interface AllowedRoles {
  admin: typeof Admin;
  manager: typeof Manager;
  customer: typeof Customer;
  delivery_man: typeof DeliveryMan;
}

const setAuth = (allowedRoles: string[]) => {
  return async (c: any, next: () => Promise<void>) => {
    const authorization = c.req.header("Authorization");

    if (!authorization?.startsWith("Bearer ")) {
      return c.json({ message: "Unauthorized: Missing or invalid token" }, 401);
    }

    const token = authorization.split("Bearer ")[1].trim();

    if (!token) {
      return c.json({ message: "Unauthorized: No token provided" }, 401);
    }

    try {
      // Verify JWT token
      const decodedToken: any = await verify(token, process.env.JWT_SECRET!);

      if (!decodedToken || !decodedToken.role || !decodedToken.id) {
        return c.json({ message: "Unauthorized: Invalid token payload" }, 401);
      }

      // Check if role is allowed
      if (!allowedRoles.includes(decodedToken.role)) {
        return c.json(
          { message: "Unauthorized: Access denied for this role" },
          403
        );
      }

      // Fetch the corresponding user based on role
      let user;
      switch (decodedToken.role) {
        case "admin":
          user = await Admin.findById(decodedToken.id);
          c.set("admin", user);
          break;
        case "manager":
          user = await Manager.findById(decodedToken.id);
          c.set("manager", user);
          break;
        case "customer":
          user = await Customer.findById(decodedToken.id);
          c.set("customer", user);
          break;
        case "delivery_man":
          user = await DeliveryMan.findById(decodedToken.id);
          c.set("delivery_man", user);
          break;
        default:
          return c.json({ message: "Unauthorized: Unknown role" }, 403);
      }

      // If user not found
      if (!user) {
        return c.json(
          {
            message: `Unauthorized: User with role ${decodedToken.role} not found`,
          },
          404
        );
      }

      // Proceed to the next middleware
      await next();
    } catch (error) {
      console.error("Authentication Error:", error);
      return c.json(
        { message: "Internal Server Error", error: error.message },
        500
      );
    }
  };
};

export default setAuth;
