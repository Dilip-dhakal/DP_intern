import prisma from "../../config/prisma.js";
import { Prisma } from "../../generated/prisma/index.js";
import { CreateExpenseData, UpdateExpenseData } from "./expense.types.js";


export const expenseRepository={
    create:async(data:CreateExpenseData)=>{
        return prisma.expense.create({
            data
        })
    },
    findExpenseCategoryById:async(id:string)=>{
        return prisma.expenseCategory.findFirst({
            where:{
                id,
                deletedAt:null
            }
        })
    },
    findById:async(id:string)=>{
        return prisma.expense.findFirst({
            where:{
                id,
                deletedAt:null
            },
            include:{
                expenseCategory:true
            }
        })
    },
    findMany:async(where:any,skip:number,take:number)=>{
        return prisma.expense.findMany({
            where,
            skip,
            take,
            include:{
                expenseCategory:true
            },
            orderBy:{
                createdAt:"desc"
            }
        })
    },
    count:async(where:any)=>{
        return prisma.expense.count({
            where
        })
    },
    udpate:async(id:string,data:UpdateExpenseData)=>{
        return prisma.expense.update({
            where:{
                id
            },
            data
        })
    },
    softDelete:async(id:string,userId:string)=>{
        return prisma.expense.update({
            where:{
                id
            },
            data:{
                deletedAt:new Date(),
                updatedById:userId
            }
        })
    }
}