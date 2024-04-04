import { Router } from "express";

import { TagsController } from "../controllers/TagsController.js";

const tagsRoutes = Router();

const tagsController = new TagsController();

tagsRoutes.get("/:userId", tagsController.index);

export { tagsRoutes };

