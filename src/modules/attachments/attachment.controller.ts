import { Request, Response } from "express";

import { attachmentService } from "./attachment.service.js";
import { uploadAttachmentParamsSchema } from "./attachment.schema.js";

export const uploadAttachment = async (req: Request, res: Response) => {
  const { id } = uploadAttachmentParamsSchema.parse(req.params);
  const file = req.file;

  const userId = req.user?.id;

  const ipAddress = req.headers["x-forwarded-for"] || req.ip;

  if (!file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }

  const result = await attachmentService.create(
    id,
    file,
    userId as string,
    ipAddress as string,
  );

  return res.status(201).json({
    success: true,
    message: "Attachment uploaded successfully",
    data: result,
  });
};
export const downloadAttachment = async (req: Request, res: Response) => {
  const { id } = uploadAttachmentParamsSchema.parse(req.params);

  const result = await attachmentService.download(id);

  return res.redirect(result.storageUrl);
};
export const getAttachments = async (req: Request, res: Response) => {
  const { id } = uploadAttachmentParamsSchema.parse(req.params);

  const result = await attachmentService.getAll(id);

  return res.status(200).json({
    success: true,
    data: result,
  });
};

export const deleteAttachment = async (req: Request, res: Response) => {
  const { id } = uploadAttachmentParamsSchema.parse(req.params);

  const userId = req.user?.id;

  const ipAddress = req.headers["x-forwarded-for"] || req.ip;

  await attachmentService.delete(id, userId as string, ipAddress as string);

  return res.status(200).json({
    success: true,
    message: "Attachment deleted successfully",
  });
};
