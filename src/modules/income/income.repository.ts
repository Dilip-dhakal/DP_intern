import prisma from "../../config/prisma.js";
import { CreateIncomeData, UpdateIncomeData } from "./income.types.js";

export const incomeRepository = {
    create: async (data: CreateIncomeData) => {
        return prisma.income.create({
            data
        });
    },

    findById: async (id: string) => {
        return prisma.income.findFirst({
            where: {
                id,
                deletedAt: null
            },
            include: {
                incomeCategory: true
            }
        });
    },

    findMany: async (
        where: any,
        skip: number,
        take: number
    ) => {
        return prisma.income.findMany({
            where,
            skip,
            take,
            include: {
                incomeCategory: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });
    },

    count: async (where: any) => {
        return prisma.income.count({
            where
        });
    },

    update: async (
        id: string,
        data: UpdateIncomeData) => {
        return prisma.income.update({
            where: {
                id
            },
            data
        });
    },

    softDelete: async (
        id: string,
        userId: string
    ) => {
        return prisma.income.update({
            where: {
                id
            },
            data: {
                deletedAt: new Date(),
                updatedById: userId
            }
        });
    },
    findIncomeCategoryById:async(id:string)=>{
        return prisma.incomeCategory.findUnique({
            where:{
                id
            }
        })
    }
};