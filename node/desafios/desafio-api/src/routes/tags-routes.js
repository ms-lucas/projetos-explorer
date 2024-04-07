import { Router } from "express";
import { TagsController } from "../controllers/tags-controller.js";

export const tagsRoutes = Router();

const tagsController = new TagsController();

tagsRoutes.post("/:movieNoteID", tagsController.create);
tagsRoutes.get("/", tagsController.index);
