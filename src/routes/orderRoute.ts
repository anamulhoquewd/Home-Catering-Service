import { Hono } from "hono";
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getCustomerOrders,
} from "../controllers/orderController.js";
import setAuth from "../middlewares/setAuth.js";

const order = new Hono();

// only admin or manager can get all orders
order.get("/orders", setAuth(["admin", "manager"]), getOrders);

// only admin or manager or customer can get order
order.get("/orders/:id", setAuth(["admin", "manager"]), getOrderById);

// only customer can get orders
order.get("/ordersByCustomer", setAuth(["customer"]), getCustomerOrders);

// only customer can create order
order.post("/orders/register", setAuth(["customer"]), createOrder);

// only admin or manager can update order
order.put("/orders/:id", setAuth(["admin", "manager"]), updateOrder);

// only admin can delete order
order.delete("/orders/:id", setAuth(["admin"]), deleteOrder);

export default order;
