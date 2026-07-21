import prisma from "../../config/prisma.js";
import { Prisma } from "../../generated/prisma/index.js";
import { CreateReminderData, UpdateReminderData } from "./reminder.type.js";

export const reminderRepository = {
  create: async (data: CreateReminderData) => {
    return await prisma.reminder.create({
      data,
    });
  },
  findMany: async (where: any, skip: number, take: number) => {
    return await prisma.reminder.findMany({
      where,
      skip,
      take,
      orderBy: [
    {
        reminderDate: "asc",
    },
    {
        priority: "desc",
    },
    {
        createdAt: "desc",
    },
]
    });
  },
  findById: async (id: string) => {
    return await prisma.reminder.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  },
  count: async (where: any) => {
    return await prisma.reminder.count({
      where,
    });
  },
  update:async(id:string,data:UpdateReminderData)=>{
    return await prisma.reminder.update({
        where:{
            id
        },
        data
    })
  },
  softDelete:async(id:string,userId:string)=>{
    return await prisma.reminder.update({
        where:{
            id
        },
        data:{
            deletedAt:new Date(),
            deletedById:userId
        }
    })
  }
};
