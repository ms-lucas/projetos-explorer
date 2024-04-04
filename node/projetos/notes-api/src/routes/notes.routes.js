import { Router } from "express";
import { NotesController } from "../controllers/NotesController.js";

export const notesRoutes = Router();

const notesController = new NotesController();

notesRoutes.post("/:userId", notesController.create);
notesRoutes.get("/:id", notesController.show);
notesRoutes.get("/", notesController.index);
notesRoutes.delete("/:id", notesController.delete);
