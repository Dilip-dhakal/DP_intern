import { Request,Response } from "express"
import { createExpenseCategorySchema, expenseCategoryIdSchema, getExpenseCategoryQuerySchema, updateExpenseCategorySchema } from "./expense.category.schema.js"
import { expenseCategoryService } from "./expense.category.service.js"
import { success } from "zod"

export const createExpensesCategory=async(req:Request,res:Response)=>{
    const ipAddress=req.headers["x-forwarded-for"]||req.ip
    const userId=req.user?.id
    const body =createExpenseCategorySchema.parse(req.body)
    const result=await expenseCategoryService.create(body,ipAddress as string,userId as string)
    return res.status(201).json({
        success:true,
        messsage:"Expense Category added successfully",
        data:result
    })
}
export const getExpenseCategoryById=async(req:Request,res:Response)=>{
    const {id}=expenseCategoryIdSchema.parse(req.params)
    const result=await expenseCategoryService.getExpenseById(id)
    return res.status(200).json({
        success:true,
        message:"Single expense category fetched successfully",
        data:result
    })
}
export const getExpenseCategories=async(req:Request,res:Response)=>{
    const query=getExpenseCategoryQuerySchema.parse(req.body)
    const result=await expenseCategoryService.getAll(query)

    return res.status(200).json({
        success:true,
        message:"Expensee categiories fetched successfully"
    })
}

export const updatedByID=async(req:Request,res:Response)=>{
    const {id}=expenseCategoryIdSchema.parse(req.params)
    const ipAddress=req.headers["x-forwaded-for"]||req.ip
    const userId=req.user?.id
    const body=updateExpenseCategorySchema.parse(req.body)
    const result=await expenseCategoryService.updateExpense(id,body,userId as string,ipAddress as string)
    return res.status(200).json({
        success:true,
        message:"Expense category udpated successfully",
        data:result
    })
}

export const deletedById=async(req:Request,res:Response)=>{
    const {id}=expenseCategoryIdSchema.parse(req.params)
    const ipAddress=req.headers["x-forwaded-for"]||req.ip
    const userId=req.user?.id
    const result=expenseCategoryService.deleteExpense(id,userId as string,ipAddress as string)
    return res.status(200).json({
        success:true,
        message:"Expense Category deleted successfully",
        data:result
    })
}