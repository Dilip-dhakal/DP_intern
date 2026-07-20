import { Request,Response } from "express"
import { createIncomeSchema, getIncomeByIdSchema, getIncomeQuerySchema, updateIncomeSchema } from "./income.schema.js"
import { incomeService } from "./income.service.js"
import { sendResponse } from "../../shared/response.js"

export const createIncome=async(req:Request,res:Response)=>{
    const validatedBody=createIncomeSchema.parse(req.body)
    const ipAddress=req.headers["x-forwarded-for"]||req.ip
    const userId=req.user?.id
    const result=await incomeService.create(validatedBody,userId as string,ipAddress as string)
    return sendResponse(res, 201, "Income created successfully", result)
}

export const getIncome=async(req:Request,res:Response)=>{
    const query=getIncomeQuerySchema.parse(req.query)
    const result=await incomeService.getIncome(query)
    return sendResponse(res, 200, "Incoe fetched successfully", result.data, result.metadata)
}

export const getIncomeById=async(req:Request,res:Response)=>{
    const {id}=getIncomeByIdSchema.parse(req.params)
    const result=await incomeService.getIncomeById(id as string)
    return sendResponse(res, 200, "income fetched successfully by id", result)
}

export const updateIncomeById=async(req:Request,res:Response)=>{
    const ipAddress=req.headers["x-forwarded-for"]||req.ip
    const {id}=getIncomeByIdSchema.parse(req.params)
    const body=updateIncomeSchema.parse(req.body)
    const userId=req.user?.id
    
    const result=await incomeService.updateIncomeById(id,body,userId as string,ipAddress as string)
    return sendResponse(res, 200, "Income updated successfully", result)
}

export const deleteIncomeById=async(req:Request,res:Response)=>{
    const ipAddress=req.headers["x-forwarded-for"]||req.ip
    const {id}=getIncomeByIdSchema.parse(req.params)
    const userId=req.user?.id as string
    const result=incomeService.deleteIncomeById(id,userId,ipAddress as string)
    return sendResponse(res, 200, "Income deleted successfully")
}