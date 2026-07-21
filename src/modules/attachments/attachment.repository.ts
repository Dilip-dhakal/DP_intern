import prisma from "../../config/prisma.js";
import { CreateAttachmentData } from "./attachment.types.js";

export const attachmentRepository = {
  create: async (data: CreateAttachmentData) => {
    return prisma.attachment.create({
      data: {
        ...data,
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

  findMany: async (
    entityType: "INCOME" | "EXPENSE" | "REMINDER",
    entityId: string,
  ) => {
    return prisma.attachment.findMany({
      where: {
        entityType,
        entityId,
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },
      findManyByEntityIds: async (
    entityType: "INCOME" | "EXPENSE" | "REMINDER",
    entityIds: string[],
) => {
    return prisma.attachment.findMany({
        where: {
            entityType,
            entityId: {
                in: entityIds,
            },
            deletedAt: null,
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
