import { Request, Response } from "express";

import { attachmentService } from "./attachment.service.js";
import {
  uploadAttachmentSchema,
  attachmentIdSchema,
} from "./attachment.schema.js";
import { storageProvider } from "../../providers/storage/index.js";
import { ErrorHandler } from "../../middleware/errorHandler.js";
import { sendResponse } from "../../shared/response.js";

export const uploadAttachment = async (req: Request, res: Response) => {
  try {
    const { entityType, entityId } = uploadAttachmentSchema.parse(req.params);
    // console.log("1. Entity check passed in controller");

    const file = req.file;

    if (!file) {
      throw new ErrorHandler(404,"No suhc file exists")
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

  

    return sendResponse(
      res,
      200,
      "Image uploaded successfully",
      result
    )
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const getAttachments = async (req: Request, res: Response) => {
  const { entityId } = uploadAttachmentSchema.parse(req.params);

  const result = await attachmentService.getAll(entityId);

  return sendResponse(
    res,
    200,
    "Data fetched successflly",
    result
  )
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

  return sendResponse(res, 200, "Attachment deleted successfully");
};
