import { Request,Response } from "express"
import { createExpenseCategorySchema, expenseCategoryIdSchema, getExpenseCategoryQuerySchema, updateExpenseCategorySchema } from "./expense.category.schema.js"
import { expenseCategoryService } from "./expense.category.service.js"
import { sendResponse } from "../../../shared/response.js"

export const createExpensesCategory=async(req:Request,res:Response)=>{
    const ipAddress=req.headers["x-forwarded-for"]||req.ip
    const userId=req.user?.id
    const body =createExpenseCategorySchema.parse(req.body)
    const result=await expenseCategoryService.create(body,ipAddress as string,userId as string)
    return sendResponse(res, 201, "Expense Category added successfully", result)
}
export const getExpenseCategoryById=async(req:Request,res:Response)=>{
    const {id}=expenseCategoryIdSchema.parse(req.params)
    const result=await expenseCategoryService.getExpenseById(id)
    return sendResponse(res, 200, "Single expense category fetched successfully", result)
}
export const getExpenseCategories=async(req:Request,res:Response)=>{
    const query=getExpenseCategoryQuerySchema.parse(req.body)
    const result=await expenseCategoryService.getAll(query)

    return sendResponse(res, 200, "Expensee categiories fetched successfully", result.data, result.metadata)
}

export const updatedByID=async(req:Request,res:Response)=>{
    const {id}=expenseCategoryIdSchema.parse(req.params)
    const ipAddress=req.headers["x-forwaded-for"]||req.ip
    const userId=req.user?.id
    const body=updateExpenseCategorySchema.parse(req.body)
    const result=await expenseCategoryService.updateExpense(id,body,userId as string,ipAddress as string)
    return sendResponse(res, 200, "Expense category udpated successfully", result)
}

export const deletedById=async(req:Request,res:Response)=>{
    const {id}=expenseCategoryIdSchema.parse(req.params)
    const ipAddress=req.headers["x-forwaded-for"]||req.ip
    const userId=req.user?.id
    const result=expenseCategoryService.deleteExpense(id,userId as string,ipAddress as string)
    return sendResponse(res, 200, "Expense Category deleted successfully", result)
}