import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { poweredBy } from "hono/powered-by";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import manager from "./routes/managerRoute.js";
import delivery_man from "./routes/delivery_manRoute.js";
import customer from "./routes/customerRoute.js";
import product from "./routes/productRoute.js";
import admin from "./routes/adminRoute.js";
import order from "./routes/orderRoute.js";

dotenv.config();

const port = Number(process.env.PORT) || 4000;

const app = new Hono();

// middlewares
app.use("/api/*", cors());
app.use(logger());
app.use(poweredBy());

// database connection
connectDB()
  .then(() => {
    app.route("/api", manager);
    app.route("/api", delivery_man);
    app.route("/api", customer);
    app.route("/api", product);
    app.route("/api", admin);
    app.route("/api", order);

    // Error handler
    app.onError((err, c) =>
      c.text(err?.message || "Internal Server Error", 500)
    );
  })

  .catch((err) => {
    app.get("/", (c) => {
      return c.text(`Database connection failed : ${err?.message}`);
    });
  });

console.log(`Server is running on port ${port}.`);

serve({
  fetch: app.fetch,
  port,
});
