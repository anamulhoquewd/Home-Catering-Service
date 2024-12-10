import { Hono } from "hono";
import {
  getAdmin,
  loginAdmin,
  updateAdmin,
} from "../controllers/adminController.js";
import setAuth from "../middlewares/setAuth.js";

const admin = new Hono();
// only admin can create admin
// admin.post("/admin/register", async (c: any) => {
//   const body = await c.req.json();

//   console.log(body);

//   const hashedPassword = await bcrypt.hash(body.password, 10);

//   const admin = new Admin({
//     ...body,
//     password: hashedPassword,
//   });

//   const document = await admin.save();
//   return c.json(document, 201);
// });

// only admin can get admin

admin.get("/admin/:id", setAuth(["admin"]), getAdmin);

// only admin can login
admin.post("/admin/login", loginAdmin);

// only admin can update admin
admin.put("/admin/:id", setAuth(["admin"]), updateAdmin);

export default admin;
