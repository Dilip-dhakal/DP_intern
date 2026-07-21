import { AuditEntityType, Prisma } from "../../generated/prisma/index.js";
import { ErrorHandler } from "../../middleware/errorHandler.js";
import { auditService } from "../../services/audit.services.js";
import { pagination } from "../../utils/pagination.js";
import { attachmentRepository } from "../attachments/attachment.repository.js";
import { expenseRepository } from "./expense.repository.js";
import { GetExpenseQuery } from "./expense.schema.js";
import { CreateExpenseRequest, UpdateExpenseData } from "./expense.types.js";

export const expenseService = {
  create: async (
    data: CreateExpenseRequest,
    ipAddress: string,
    userId: string,
  ) => {
    const category = await expenseRepository.findExpenseCategoryById(
      data.expenseCategoryId,
    );
    if (!category) {
      throw new ErrorHandler(404, "No such category exists");
    }
    const databaseObj = {
      ...data,
      createdById: userId,
    };
    const result = await expenseRepository.create(databaseObj);
    auditService.log(
      userId,
      "CREATE",
      AuditEntityType.EXPENSE,
      result.id,
      null,
      result,
      ipAddress,
    );
    return result;
  },
  getAll: async (query: GetExpenseQuery) => {
    const { page, limit, skip } = pagination(query);
    const where: Prisma.ExpenseWhereInput = {
      deletedAt: null,
    };

    if (query.from && query.to) {
      where.transactionDate = {
        gte: new Date(query.from),
        lte: new Date(query.to),
      };
    }
    if (query.category) {
      where.expenseCategoryId = query.category;
    }

    if (query.payment_method) {
      where.paymentMethod = query.payment_method;
    }

    if (query.amount_min && query.amount_max) {
      where.amount = {
        gte: query.amount_min,
        lte: query.amount_max,
      };
    }

    if (query.vendor_name) {
      where.vendorName = {
        contains: query.vendor_name,
        mode: "insensitive",
      };
    }

    if (query.search) {
      where.OR = [
        {
          vendorName: {
            contains: query.search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: query.search,
            mode: "insensitive",
          },
        },
        {
          referenceNumber: {
            contains: query.search,
            mode: "insensitive",
          },
        },
        {
          invoiceNumber: {
            contains: query.search,
            mode: "insensitive",
          },
        },
      ];
    }

    const expenses = await expenseRepository.findMany(where, skip, limit);
    const total = await expenseRepository.count(where);
    const totalPages = Math.ceil(total / limit);
    return {
      data: expenses,
      metadata: {
        page,
        limit,
        totalPages,
        total,
      },
    };
  },
  getById:async(id:string)=>{
    const expense=await expenseRepository.findById(id)
    if(!expense){
        throw new ErrorHandler(404,"No such expense found")
    }
    const attachments=await attachmentRepository.findMany(
      "EXPENSE",
      expense.id
    )
    return {
      ...expense,
      attachments
    }
  },
  updateExpense:async(id:string,userId:string,ipAddress:string,data:UpdateExpenseData)=>{
    const expense=await expenseRepository.findById(id)
    if(!expense){
        throw new ErrorHandler(404,"Such expense doesnt exists")
    }
    if(data.expenseCategoryId){
        const category=await expenseRepository.findExpenseCategoryById(data.expenseCategoryId)
        if(!category){
            throw new ErrorHandler(404,"Such category doesnt exists")
        }
    }
    const dataObj={
        ...data,
        updatedByid:userId
    }
    const updatedExpense=await expenseRepository.udpate(id,dataObj)

    auditService.log(
        userId,
        "UPDATE",
        "EXPENSE",
        id,
        expense,
        updatedExpense,
        ipAddress
    )
    return updatedExpense
  },
  deleteExpense:async(id:string,userId:string,ipAddress:string)=>{
    const expense=await expenseRepository.findById(id)
    if(!expense){
        throw new ErrorHandler(404,"No such expense found to delete")
    }
    const result=await expenseRepository.softDelete(id,userId)
    auditService.log(
        userId,
        "DELETE",
        "EXPENSE",
        id,
        expense,
        null,
        ipAddress
    )
    return result
  }
};
