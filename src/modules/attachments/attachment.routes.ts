import { Router } from "express";
import { authGuard } from "../../middleware/authGuard.js";
import upload from "../../middleware/multer.js";

import {
  uploadAttachment,
  getAttachments,
  downloadAttachment,
  deleteAttachment,
} from "./attachment.controller.js";

const router = Router();

/**
 * @swagger
 * /attachment/{entityType}/{entityId}:
 *   post:
 *     summary: Upload attachment
 *     tags:
 *       - Attachment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: entityType
 *         required: true
 *         schema:
 *           type: string
 *         example: INCOME
 *       - in: path
 *         name: entityId
 *         required: true
 *         schema:
 *           type: string
 *         example: 0d7bcb77-97e0-4db8-bc0d-f6652a90a1d3
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Attachment uploaded successfully
 */
router.post(
  "/:entityType/:entityId",
  authGuard,
  upload.single("file"),
  uploadAttachment
);

/**
 * @swagger
 * /attachment/download/{attachmentId}:
 *   get:
 *     summary: Download attachment
 *     tags:
 *       - Attachment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: attachmentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Attachment downloaded successfully
 */
router.get(
  "/download/:attachmentId",
  authGuard,
  downloadAttachment
);

/**
 * @swagger
 * /attachment/{entityType}/{entityId}:
 *   get:
 *     summary: Get attachments by entity
 *     tags:
 *       - Attachment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: entityType
 *         required: true
 *         schema:
 *           type: string
 *         example: INCOME
 *       - in: path
 *         name: entityId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Attachments fetched successfully
 */
router.get(
  "/:entityType/:entityId",
  authGuard,
  getAttachments
);

/**
 * @swagger
 * /attachment/{attachmentId}:
 *   delete:
 *     summary: Delete attachment
 *     tags:
 *       - Attachment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: attachmentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Attachment deleted successfully
 */
router.delete(
  "/:attachmentId",
  authGuard,
  deleteAttachment
);

export default router;