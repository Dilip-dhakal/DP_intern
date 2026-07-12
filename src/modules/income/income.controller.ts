import { Request,Response } from "express"
import { createIncomeSchema, getIncomeQuerySchema } from "./income.schema.js"
import { incomeService } from "./income.service.js"
import { ErrorHandler } from "../../middleware/errorHandler.js"
import { success } from "zod"

export const createIncome=async(req:Request,res:Response)=>{
    if(req.body===undefined){
        throw new ErrorHandler(400,"Data cant be empty/undefined")
    }
    const validatedBody=createIncomeSchema.parse(req.body)
    const userId=req.user?.id
    const result=await incomeService.create(validatedBody,userId as string)
    return res.status(201).json({
        success:true,
        message:"Income created successfully",
        data:result
    })
}

export const getIncome=async(req:Request,res:Response)=>{
    const query=getIncomeQuerySchema.parse(req.body)
    const result=await incomeService.getIncome(query)
    return res.status(200).json({
        success:true,
        message:"Incoe fetched successfully",
        data:result
    })
}