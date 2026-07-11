import prisma from "../../config/prisma.js";
import { Prisma } from "../../generated/prisma/index.js";
import { ErrorHandler } from "../../middleware/errorHandler.js";
import { incomeRepository } from "./income.repository.js";
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
    }
}