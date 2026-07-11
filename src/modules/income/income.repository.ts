import prisma from "../../config/prisma.js";
import { Prisma } from "../../generated/prisma/index.js";

export const incomeRepository={
    create :async(data:Prisma.IncomeCreateInput)=>{
        return await prisma.income.create({
            data
        })
    },
    findById:async(id:string)=>{
        return await prisma.income.findFirst({
            where:{
                id,
                deletedAt:null
            },
            include:{
                incomeCategory:true
            }
        })
    },
    findMany:async(
        where:Prisma.IncomeWhereInput,
    skip:number,
    take:number)=>{
        return prisma.income.findMany({
            where,
            skip,
            take,

            include:{
                incomeCategory:true
            },
            orderBy:{
                createdAt:"desc"
            }
        })
    },
    count:async(where:Prisma.IncomeWhereInput)=>{
        return prisma.income.count({
            where
        })
    },
    update:async(id:string,data:Prisma.IncomeUpdateInput)=>{
        return prisma.income.update({
            where:{
                id
            },
            data
        })
    },
    softDelete:async(id:string,userId:string)=>{
        return prisma.income.update({
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