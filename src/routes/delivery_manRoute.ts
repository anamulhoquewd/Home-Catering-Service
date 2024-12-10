import { Hono } from "hono";
import {
  getDelivery_manById,
  getAllDelivery_mans,
  createDelivery_man,
  loginDelivery_man,
  updateDelivery_man,
  deleteDelivery_man,
  getDeliveryMan,
} from "../controllers/delivery_manController.js";
import setAuth from "../middlewares/setAuth.js";

const delivery_man = new Hono();

// only admin or manager can get all delivery_mans
delivery_man.get("/delivery-mans", setAuth(["admin"]), getAllDelivery_mans);

// only admin or manager can get delivery_man
delivery_man.get("/delivery-mans/:id", setAuth(["admin"]), getDelivery_manById);

// only delivery_man can get delivery_man
delivery_man.get("/delivery-man", setAuth(["delivery_man"]), getDeliveryMan);

// only admin can create delivery_man
delivery_man.post(
  "/delivery-mans/register",
  setAuth(["admin"]),
  createDelivery_man
);

// only delivery_man can login
delivery_man.post("/delivery-mans/login", loginDelivery_man);

// only admin or delivery_man can update delivery_man
delivery_man.put(
  "/delivery-mans/:id",
  setAuth(["delivery_man"]),
  updateDelivery_man
);

// only admin can delete delivery_man
delivery_man.delete(
  "/delivery-mans/:id",
  setAuth(["admin"]),
  deleteDelivery_man
);

export default delivery_man;
