import { Hono } from "hono";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import setAuth from "../middlewares/setAuth.js";

const product = new Hono();

// only admin or manager can get all products
product.get("/products", getAllProducts);

// only admin or manager can get product
product.get("/products/:id", getProductById);

// only admin can create product
product.post("/products/register", setAuth(["admin"]), createProduct);

// only admin or manager can update product
product.put("/products/:id", setAuth(["admin", "manager"]), updateProduct);

// only admin can delete product
product.delete("/products/:id", setAuth(["admin", "manager"]), deleteProduct);

export default product;
