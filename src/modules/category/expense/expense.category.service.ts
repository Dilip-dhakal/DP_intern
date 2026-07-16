import { AuditEntityType, Prisma } from "../../../generated/prisma/index.js";
import { ErrorHandler } from "../../../middleware/errorHandler.js";
import { auditRepository, auditService } from "../../../services/audit.services.js";
import { pagination } from "../../../utils/pagination.js";
import { expenseCategoryRepository } from "./expense.category.repository.js";
import { GetExpenseCategoryQuerySchema } from "./expense.category.schema.js";
import { CreateExpenseCategoryData, UpdateExpenseCategoryData } from "./expense.category.types.js";


export const expenseCategoryService={
    create:async(data:CreateExpenseCategoryData,ipAddress:string,userId:string)=>{
        const existingCategory=await expenseCategoryRepository.findByName(data.name)
        if(existingCategory){
            throw new ErrorHandler(404,"Category already exists")
        }
        const result=await expenseCategoryRepository.create(data)
        auditService.log(
            userId,
            "CREATE",
            AuditEntityType.EXPENSE,
            result.id,
            null,
            result,
            ipAddress
        )
        return result
    },
    getAll:async(query:GetExpenseCategoryQuerySchema)=>{
        const {page,limit,skip}=pagination(query)
        const where:Prisma.ExpenseCategoryWhereInput={
            deletedAt:null
        }
        if(query.search){
            where["name"]={
                contains:query.search,
                mode:"insensitive"
            }
        }

        const categories=await expenseCategoryRepository.findMany(where,skip,limit)

        const total=await expenseCategoryRepository.count(where)

        return {
            data:categories,
            metadata:{
                page,
                limit,
                total,
                totalPages:Math.ceil(total/limit)
            }
        }
    },
    getExpenseById:async(id:string)=>{
        const category=await expenseCategoryRepository.findById(id)

        if(!category){
            throw new ErrorHandler(404,"Such expense category doesnt exists")
        }

        return category
    },
    updateExpense:async(id:string,data:UpdateExpenseCategoryData,userId:string,ipAddress:string)=>{
        const category=await expenseCategoryRepository.findById(id)
        if(!category){
            throw new ErrorHandler(404,"No such expense category exists")
        }
        const result=await expenseCategoryRepository.update(id,data)
        auditService.log(
            userId,
            "UPDATE",
            AuditEntityType.EXPENSE,
            result.id,
            category,
            result,
            ipAddress
        )
     },
     deleteExpense:async(id:string,userId:string,ipAddress:string)=>{
        const exists=await expenseCategoryRepository.findById(id)
        if(!exists){
            throw new ErrorHandler(404,"Such expense category doesnt exists")
        }
        const result=await expenseCategoryRepository.softDelete(id)
        auditService.log(
            userId,
            "DELETE",
            AuditEntityType.EXPENSE,
            id,
            exists,
            null,
            ipAddress
        )
        return result
     }
    
}