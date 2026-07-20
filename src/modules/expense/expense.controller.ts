import { Request, Response } from "express";
import { createExpenseSchema, expenseIdSchema, getExpenseQuerySchema, updateExpenseSchema } from "./expense.schema.js";
import { expenseService } from "./expense.service.js";
import { sendResponse } from "../../shared/response.js";


export const createExpense=async(req:Request,res:Response)=>{
    const data=createExpenseSchema.parse(req.body)
    const ipAddress=req.headers["x-forwarded-for"]||req.ip
    const userId=req.user?.id
    const result=await expenseService.create(data,ipAddress as string,userId as string)
    return sendResponse(res, 201, "Expense created successfully", result)
}

export const getAllExpenses=async(req:Request,res:Response)=>{
    const query=getExpenseQuerySchema.parse(req.query)
    const result=await expenseService.getAll(query)
    return sendResponse(res, 200, "All the expenses fetched successfully", result.data, result.metadata)
}

export const getExpenseById=async(req:Request,res:Response)=>{
    const {id}=expenseIdSchema.parse(req.params)
    const result=expenseService.getById(id)
    return sendResponse(res, 200, "Data fetched successfully", result)
}

export const updateExpense=async(req:Request,res:Response)=>{
    const ipAddress=req.headers["x-forwarded-for"]||req.ip
    const userId=req.user?.id
    const {id}=expenseIdSchema.parse(req.params)
    const data=updateExpenseSchema.parse(req.body) as any
    const result=await expenseService.updateExpense(id,userId as string,ipAddress as string,data)
    return sendResponse(res, 200, "Expense updated successfully", result)
}

export const deleteExpense=async(req:Request,res:Response)=>{
    const {id}=expenseIdSchema.parse(req.params)
    const ipAddress=req.headers["x-forwarded-for"]||req.ip
    const userId=req.user?.id
    const result=expenseService.deleteExpense(id,userId as string,ipAddress as string)
    return sendResponse(res, 200, "Expense deleted successfully")
}