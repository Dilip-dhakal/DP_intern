import prisma from "../../config/prisma.js";
import { Prisma } from "../../generated/prisma/index.js";
import { ErrorHandler } from "../../middleware/errorHandler.js";
import { incomeRepository } from "./income.repository.js";
import { GetIncomeQuery } from "./income.schema.js";
import { CreateIncomeData, CreateIncomeRequest } from "./income.types.js";


export const incomeService={
    create:async(data:CreateIncomeRequest,userId:string)=>{
        const category=await incomeRepository.findIncomeCategoryById(data.incomeCategoryId)
        if(!category){
            throw new ErrorHandler(404,"Such category doesnt exists")
        }
        const databaseObj={
            ...data,
            createdById:userId
        }
        const result=await incomeRepository.create(databaseObj)
        return result
    },
    getIncome:async(query:GetIncomeQuery)=>{
        const page=query.page || 1
        const limit=query.limit || 10
        const skip=(page-1)*limit
        const where={
            deletedAt:null
        }
        const incomes=await incomeRepository.findMany(where,skip,limit)
        const total=await incomeRepository.count(where)
         const totalPages =Math.ceil(total / limit);
         return {
            data:incomes,
            metadata:{
                page,
                limit,
                totalPages,
                total
            }
         }
    }
}

