import { Hono } from "hono";
import {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  loginCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomer,
} from "../controllers/customerController.js";
import setAuth from "../middlewares/setAuth.js";

const customer = new Hono();

// only admin or manager can get all customers
customer.get("/customers", setAuth(["admin", "manager"]), getAllCustomers);


  // only admin or manager or customer can get customer
customer.get(
  "/customers/:id",
  setAuth(["admin", "manager", "customer"]),
  getCustomerById
);

// only customer can get customer
customer.get("/customer", setAuth(["customer"]), getCustomer);

// only customer can create customer
customer.post("/customers/register", createCustomer);

// only customer can login
customer.post("/customers/login", loginCustomer);

// only customer can update customer
customer.put("/customers/:id", setAuth(["customer"]), updateCustomer);

// only admin can delete customer
customer.delete("/customers/:id", setAuth(["admin"]), deleteCustomer);

export default customer;
