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

/**
 * @swagger
 * /note:
 *   post:
 *     summary: Create a new note
 *     tags:
 *       - Note
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateNoteRequest'
 *     responses:
 *       201:
 *         description: Note created successfully
 */
router.post("/", authGuard, createNote);

/**
 * @swagger
 * /note:
 *   get:
 *     summary: Get all notes
 *     tags:
 *       - Note
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Notes fetched successfully
 */
router.get("/", authGuard, getNotes);

/**
 * @swagger
 * /note/{id}:
 *   get:
 *     summary: Get note by ID
 *     tags:
 *       - Note
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Note fetched successfully
 *       404:
 *         description: Note not found
 */
router.get("/:id", authGuard, getNoteById);

/**
 * @swagger
 * /note/{id}:
 *   patch:
 *     summary: Update note
 *     tags:
 *       - Note
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateNoteRequest'
 *     responses:
 *       200:
 *         description: Note updated successfully
 */
router.patch("/:id", authGuard, updateNote);

/**
 * @swagger
 * /note/{id}/pin:
 *   patch:
 *     summary: Toggle pin status of a note
 *     tags:
 *       - Note
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Note pin status updated successfully
 */
router.patch("/:id/pin", authGuard, togglePinned);

/**
 * @swagger
 * /note/{id}/archive:
 *   patch:
 *     summary: Toggle archive status of a note
 *     tags:
 *       - Note
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Note archive status updated successfully
 */
router.patch("/:id/archive", authGuard, toggleArchived);

/**
 * @swagger
 * /note/{id}:
 *   delete:
 *     summary: Delete note
 *     tags:
 *       - Note
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Note deleted successfully
 */
router.delete("/:id", authGuard, deleteNote);

export default router;