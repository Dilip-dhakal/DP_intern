import { Router } from "express";
import { authGuard } from "../../middleware/authGuard.js";

import {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
  togglePinned,
  toggleArchived,
} from "./note.controller.js";

const router = Router();

router.post("/", authGuard, createNote);
router.get("/", authGuard, getNotes);
router.get("/:id", authGuard, getNoteById);
router.patch("/:id", authGuard, updateNote);
router.patch("/:id/pin", authGuard, togglePinned);
router.patch("/:id/archive", authGuard, toggleArchived);
router.delete("/:id", authGuard, deleteNote);

export default router;
