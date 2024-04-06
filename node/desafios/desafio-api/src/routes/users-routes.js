import { Router } from "express";
import { UsersController } from "../controllers/users-controller.js";

export const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post("/", usersController.create);
usersRoutes.get("/", usersController.index);
usersRoutes.get("/:id", usersController.show);
usersRoutes.put("/:id", usersController.update);
usersRoutes.delete("/:id", usersController.delete);
