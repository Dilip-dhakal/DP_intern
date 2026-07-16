import { Request, Response } from "express";
import { createExpenseSchema, expenseIdSchema, getExpenseQuerySchema, updateExpenseSchema } from "./expense.Schema.js";
import { expenseService } from "./expense.service.js";
import { success } from "zod";


export const createExpense=async(req:Request,res:Response)=>{
    const data=createExpenseSchema.parse(req.body)
    const ipAddress=req.headers["x-forwarded-for"]||req.ip
    const userId=req.user?.id
    const result=expenseService.create(data,ipAddress as string,userId as string)
    return res.status(201).json({
        success:true,
        message:"Expense created successfully",
        data:result
    })
}

export const getAllExpenses=async(req:Request,res:Response)=>{
    const query=getExpenseQuerySchema.parse(req.query)
    const result=await expenseService.getAll(query)
    return res.status(200).json({
        success:true,
        message:"All the expenses fetched successfully",
        data:result
    })
}

export const getExpenseById=async(req:Request,res:Response)=>{
    const {id}=expenseIdSchema.parse(req.params)
    const result=expenseService.getById(id)
    return res.status(200).json({
        success:true,
        message:"Data fetched successfully",
        data:result
    })
}

export const updateExpense=async(req:Request,res:Response)=>{
    const ipAddress=req.headers["x-forwarded-for"]||req.ip
    const userId=req.user?.id
    const {id}=expenseIdSchema.parse(req.params)
    const data=updateExpenseSchema.parse(req.body) as any
    const result=await expenseService.updateExpense(id,userId as string,ipAddress as string,data)
    return res.status(200).json({
        success:true,
        message:"Expense updated successfully",
        data:result
    })
}

export const deleteExpense=async(req:Request,res:Response)=>{
    const {id}=expenseIdSchema.parse(req.params)
    const ipAddress=req.headers["x-forwarded-for"]||req.ip
    const userId=req.user?.id
    const result=expenseService.deleteExpense(id,userId as string,ipAddress as string)
    return res.status(200).json({
        success:true,
        message:"Expense deleted successfully"
    })
}