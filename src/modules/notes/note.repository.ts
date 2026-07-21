import prisma from "../../config/prisma.js";
import { Prisma } from "../../generated/prisma/index.js";
import { CreateNoteData, UpdateNoteData } from "./note.type.js";

export const noteRepository = {
  create: async (data: CreateNoteData) => {
    return await prisma.note.create({
      data,
    });
  },
  findMany: async (where: any, skip: number, take: number) => {
    return await prisma.note.findMany({
      where,
      skip,
      take,
      orderBy: [
    {
        isPinned: "desc",
    },
    {
        createdAt: "desc",
    },
],
    });
  },
  findById: async (id: string) => {
    return await prisma.note.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  },
  count: async (where: any) => {
    return await prisma.note.count({ where });
  },
  update: async (id: string, data: UpdateNoteData) => {
    return await prisma.note.update({
      where: {
        id,
      },
      data,
    });
  },
  softDelete: async (id: string, userId: string) => {
    return await prisma.note.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
        deletedById: userId,
      },
    });
  },
  togglePinned: async (id: string, isPinned: boolean) => {
    return prisma.note.update({
      where: {
        id,
      },
      data: {
        isPinned,
      },
    });
  },

  toggleArchived: async (id: string, isArchived: boolean) => {
    return prisma.note.update({
      where: {
        id,
      },
      data: {
        isArchived,
      },
    });
  },
};
