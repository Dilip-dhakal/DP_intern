import { Request,Response } from "express"
import { createIncomeSchema, getIncomeByIdSchema, getIncomeQuerySchema, updateIncomeSchema } from "./income.schema.js"
import { incomeService } from "./income.service.js"
import { ErrorHandler } from "../../middleware/errorHandler.js"
import { success } from "zod"
import { authService } from "../auth/auth.service.js"

export const createIncome=async(req:Request,res:Response)=>{
    const validatedBody=createIncomeSchema.parse(req.body)
    const ipAddress=req.headers["x-forwarded-for"]||req.ip
    const userId=req.user?.id
    const result=await incomeService.create(validatedBody,userId as string,ipAddress as string)
    return res.status(201).json({
        success:true,
        message:"Income created successfully",
        data:result
    })
}

export const getIncome=async(req:Request,res:Response)=>{
    const query=getIncomeQuerySchema.parse(req.query)
    const result=await incomeService.getIncome(query)
    return res.status(200).json({
        success:true,
        message:"Incoe fetched successfully",
        data:result
    })
}

export const getIncomeById=async(req:Request,res:Response)=>{
    const {id}=getIncomeByIdSchema.parse(req.params)
    const result=await incomeService.getIncomeById(id as string)
    return res.status(200).json({
        success:true,
        message:"income fetched successfully by id",
        data:result
    })
}

export const updateIncomeById=async(req:Request,res:Response)=>{
    const ipAddress=req.headers["x-forwarded-for"]||req.ip
    const {id}=getIncomeByIdSchema.parse(req.params)
    const body=updateIncomeSchema.parse(req.body)
    const userId=req.user?.id
    
    const result=await incomeService.updateIncomeById(id,body,userId as string,ipAddress as string)
    return res.status(200).json({
        success:true,
        messageL:"Income updated successfully",
        data:result
    })
}

export const deleteIncomeById=async(req:Request,res:Response)=>{
    const ipAddress=req.headers["x-forwarded-for"]||req.ip
    const {id}=getIncomeByIdSchema.parse(req.params)
    const userId=req.user?.id as string
    const result=incomeService.deleteIncomeById(id,userId,ipAddress as string)
    return res.status(200).json({
        success:true,
        message:"Income deleted successfully",
    })
}