import { Router } from "express";
import { authGuard } from "../../middleware/authGuard.js";
import  upload  from "../../middleware/multer.js";

import {
  uploadAttachment,
  getAttachments,
  downloadAttachment,
  deleteAttachment,
} from "./attachment.controller.js";

const router = Router();

router.post(
  "/:entityType/:entityId",
  authGuard,
  upload.single("file"),
  uploadAttachment,
);

router.get("/:entityType/:entityId", authGuard, getAttachments);

router.get("/download/:attachmentId", authGuard, downloadAttachment);

router.delete("/:attachmentId", authGuard, deleteAttachment);

export default router;
