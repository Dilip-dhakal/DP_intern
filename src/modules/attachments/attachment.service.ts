import { attachmentRepository } from "./attachment.repository.js";
import { incomeRepository } from "../income/income.repository.js";
import { storageProvider } from "../../providers/storage/index.js";
import { auditService } from "../../services/audit.services.js";
import { ErrorHandler } from "../../middleware/errorHandler.js";
import { CreateAttachmentData } from "./attachment.types.js";

export const attachmentService = {
  create: async (
    incomeId: string,
    file: Express.Multer.File,
    userId: string,
    ipAddress: string,
  ) => {
    const income = await incomeRepository.findById(incomeId);

    if (!income) {
      throw new ErrorHandler(404, "Income not found");
    }

    const uploaded = await storageProvider.upload(file);

    const attachmentData: CreateAttachmentData = {
      entityType: "INCOME",

      entityId: incomeId,

      fileName: file.originalname,

      fileSize: file.size,

      mimeType: file.mimetype,

      storageKey: uploaded.storageKey,

      storageUrl: uploaded.storageUrl,

      provider: uploaded.provider,

      uploadedById: userId,
    };

    const attachment = await attachmentRepository.create(attachmentData);

    await auditService.log(
      userId,
      "CREATE",
      "INCOME",
      attachment.id,
      null,
      attachment,
      ipAddress,
    );

    return attachment;
  },
  download: async (attachmentId: string) => {
    const attachment = await attachmentRepository.findById(attachmentId);

    if (!attachment) {
      throw new ErrorHandler(404, "Attachment not found");
    }

    return attachment;
  },

  getAll: async (entityId: string) => {
    return await attachmentRepository.findMany(entityId);
  },

  getById: async (id: string) => {
    const attachment = await attachmentRepository.findById(id);

    if (!attachment) {
      throw new ErrorHandler(404, "Attachment not found");
    }

    return attachment;
  },

  delete: async (id: string, userId: string, ipAddress: string) => {
    const attachment = await attachmentRepository.findById(id);

    if (!attachment) {
      throw new ErrorHandler(404, "Attachment not found");
    }

    await storageProvider.delete(attachment.storageKey);

    await attachmentRepository.softDelete(id);

    await auditService.log(
      userId,
      "DELETE",
      "INCOME",
      id,
      attachment,
      null,
      ipAddress,
    );
  },
};
