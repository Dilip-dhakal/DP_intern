import { AuditAction } from "../../generated/prisma/index.js";
import { ErrorHandler } from "../../middleware/errorHandler.js";
import { auditService } from "../../services/audit.services.js";

import { attachmentRepository } from "./attachment.repository.js";
import { storageProvider } from "../../providers/storage/index.js";

import { incomeRepository } from "../income/income.repository.js";
import { expenseRepository } from "../expense/expense.repository.js";

import { CreateAttachmentData } from "./attachment.types.js";

export const attachmentService = {
  create: async (
    entityType: "INCOME" | "EXPENSE" | "REMINDER",
    entityId: string,
    file: Express.Multer.File,
    userId: string,
    ipAddress: string,
  ) => {
    if (entityType === "INCOME") {
      const income = await incomeRepository.findById(entityId);

      if (!income) {
        throw new ErrorHandler(404, "Income not found");
      }
    }

    if (entityType === "EXPENSE") {
      const expense = await expenseRepository.findById(entityId);

      if (!expense) {
        throw new ErrorHandler(404, "Expense not found");
      }
      
    }
    // console.log("1 ENtity pass checked in service")
    console.log
    const uploadedFile = await storageProvider.upload(file);
    // console.log("2. Uploaded:", uploadedFile);

    const data: CreateAttachmentData = {
      entityType,
      entityId,
      fileName: file.originalname,
      fileSize: file.size,
      mimeType: file.mimetype,
      storageKey: uploadedFile.storageKey,
      storageUrl: uploadedFile.storageUrl,
      provider: "CLOUDINARY",
      uploadedById: userId,
    };

    const attachment = await attachmentRepository.create(data);
    // console.log("3.data uploaded",attachment)

    await auditService.log(
      userId,
      AuditAction.CREATE,
      entityType,
      attachment.id,
      null,
      attachment,
      ipAddress,
    );
    // console.log("4. Audit logged");

    return attachment;
  },

  getAll: async (entityId: string) => {
    return attachmentRepository.findMany(entityId);
  },

  download: async (attachmentId: string) => {
    const attachment = await attachmentRepository.findById(attachmentId);

    if (!attachment) {
      throw new ErrorHandler(404, "Attachment not found");
    }

    return attachment;
  },

  delete: async (attachmentId: string, userId: string, ipAddress: string) => {
    const attachment = await attachmentRepository.findById(attachmentId);

    if (!attachment) {
      throw new ErrorHandler(404, "Attachment not found");
    }

    await storageProvider.delete(attachment.storageKey);

    await attachmentRepository.softDelete(attachmentId);

    await auditService.log(
      userId,
      AuditAction.DELETE,
      attachment.entityType,
      attachment.id,
      attachment,
      null,
      ipAddress,
    );
  },
};
