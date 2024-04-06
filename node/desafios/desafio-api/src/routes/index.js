import { Router } from "express";
import { movieNotesRoutes } from "./movie-notes-routes.js";
import { tagsRoutes } from "./tags-routes.js";
import { usersRoutes } from "./users-routes.js";

export const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/movie-notes", movieNotesRoutes);
routes.use("/tags", tagsRoutes);
