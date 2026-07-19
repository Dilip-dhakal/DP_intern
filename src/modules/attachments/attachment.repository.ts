import prisma from "../../config/prisma.js";
import { CreateAttachmentData } from "./attachment.types.js";

export const attachmentRepository = {
  create: async (data: CreateAttachmentData) => {
    return prisma.attachment.create({
      data: {
        ...data,
        fileSize: data.fileSize,
        provider: "CLOUDINARY",
      },
    });
  },

  findById: async (id: string) => {
    return prisma.attachment.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  },

  findMany: async (entityId: string) => {
    return prisma.attachment.findMany({
      where: {
        entityId,
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  softDelete: async (id: string) => {
    return prisma.attachment.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  },
};
