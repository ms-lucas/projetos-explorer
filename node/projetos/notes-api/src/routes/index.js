import { Router } from "express";

import { notesRoutes } from "./notes.routes.js";
import { tagsRoutes } from "./tags.routes.js";
import { usersRoutes } from "./users.routes.js";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/notes", notesRoutes);
routes.use("/tags", tagsRoutes);

export { routes };

