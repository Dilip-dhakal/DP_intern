import { Request, Response } from "express";

import { attachmentService } from "./attachment.service.js";
import {
  uploadAttachmentSchema,
  attachmentIdSchema,
} from "./attachment.schema.js";
import { storageProvider } from "../../providers/storage/index.js";

export const uploadAttachment = async (req: Request, res: Response) => {
  try {
    const { entityType, entityId } = uploadAttachmentSchema.parse(req.params);
    // console.log("1. Entity check passed in controller");

    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }
    console.log(req.file)
    const uploadedFile = await storageProvider.upload(file);
    const userId = req.user?.id;
    const ipAddress = req.headers["x-forwarded-for"] || req.ip;

    // console.log("2 before calling service")

    const result = await attachmentService.create(
      entityType,
      entityId,
      file,
      userId as string,
      ipAddress as string,
    );

  

    return res.status(201).json({
      success: true,
      message: "Attachment uploaded successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const getAttachments = async (req: Request, res: Response) => {
  const { entityId } = uploadAttachmentSchema.parse(req.params);

  const result = await attachmentService.getAll(entityId);

  return res.status(200).json({
    success: true,
    data: result,
  });
};

export const downloadAttachment = async (req: Request, res: Response) => {
  const { attachmentId } = attachmentIdSchema.parse(req.params);

  const result = await attachmentService.download(attachmentId);

  return res.redirect(result.storageUrl);
};

export const deleteAttachment = async (req: Request, res: Response) => {
  const { attachmentId } = attachmentIdSchema.parse(req.params);

  const userId = req.user?.id;
  const ipAddress = req.headers["x-forwarded-for"] || req.ip;

  await attachmentService.delete(
    attachmentId,
    userId as string,
    ipAddress as string,
  );

  return res.status(200).json({
    success: true,
    message: "Attachment deleted successfully",
  });
};
