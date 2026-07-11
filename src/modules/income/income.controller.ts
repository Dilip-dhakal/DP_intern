import { Request,Response } from "express"
import { createIncomeSchema } from "./income.schema.js"
import { incomeService } from "./income.service.js"
import { ErrorHandler } from "../../middleware/errorHandler.js"

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