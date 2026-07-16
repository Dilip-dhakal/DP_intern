import prisma from "../../../config/prisma.js";
import { Prisma } from "../../../generated/prisma/index.js";

export const expenseCategoryRepository = {
  create: async (data: any) => {
    return prisma.expenseCategory.create({
      data,
    });
  },
  findByName:async(name:string)=>{
    return prisma.expenseCategory.findFirst({
        where:{
            name,
            deletedAt:null
        },
        
    })
  },

  findMany: async (where: Prisma.ExpenseCategoryWhereInput,skip:number,take:number) => {
    return prisma.expenseCategory.findMany({
      where,
      skip,
      take,
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  findById: async (id: string) => {
    return prisma.expenseCategory.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  },
  count:async(where:Prisma.ExpenseCategoryWhereInput)=>{
    return prisma.expenseCategory.count({
      where
    })
  },

  update: async (id: string, data: any) => {
    return prisma.expenseCategory.update({
      where: {
        id,
      },
      data,
    });
  },

  softDelete: async (id: string) => {
    return prisma.expenseCategory.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  },
};
