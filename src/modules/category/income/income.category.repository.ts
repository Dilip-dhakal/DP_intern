import prisma from "../../../config/prisma.js";
import { Prisma } from "../../../generated/prisma/index.js";
import {
  CreateIncomeCategoryData,
  UpdateIncomeCategoryData,
} from "./income.category.types.js";

export const incomeCategoryRepository = {
  create: async (data: CreateIncomeCategoryData) => {
    return prisma.incomeCategory.create({
      data,
    });
  },

  findById: async (id: string) => {
    return prisma.incomeCategory.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  },

  findByName: async (name: string) => {
    return prisma.incomeCategory.findFirst({
      where: {
        name,
        deletedAt: null,
      },
    });
  },

  findMany: async (
    where: Prisma.IncomeCategoryWhereInput,
    skip: number,
    take: number,
  ) => {
    return prisma.incomeCategory.findMany({
      where,
      skip,
      take,
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  count: async (where: Prisma.IncomeCategoryWhereInput) => {
    return prisma.incomeCategory.count({
      where,
    });
  },

  update: async (id: string, data: UpdateIncomeCategoryData) => {
    return prisma.incomeCategory.update({
      where: {
        id,
      },
      data,
    });
  },

  softDelete: async (id: string,userId:string) => {
    return prisma.incomeCategory.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  },
};
