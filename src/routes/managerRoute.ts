import { Hono } from "hono";
import {
  getAllManagers,
  getManagerById,
  createManager,
  loginManager,
  updateManager,
  deleteManager,
  getManager,
} from "../controllers/managerController.js";
import setAuth from "../middlewares/setAuth.js";

const manager = new Hono();

// only admin or manager can get all managers
manager.get("/managers", setAuth(["admin"]), getAllManagers);

// only admin or manager can get manager
manager.get("/managers/:id", setAuth(["admin"]), getManagerById);

manager.get("/manager", setAuth(["manager"]), getManager);

// only admin can create manager
manager.post("/managers/register", setAuth(["admin"]), createManager);

// only manager can login
manager.post("/managers/login", loginManager);

// only manager can update manager
manager.put("/managers/:id", setAuth(["manager"]), updateManager);

// only admin can delete manager
manager.delete("/managers/:id", setAuth(["admin"]), deleteManager);

export default manager;
