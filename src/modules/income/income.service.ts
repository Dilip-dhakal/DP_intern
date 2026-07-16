import prisma from "../../config/prisma.js";
import { Prisma } from "../../generated/prisma/index.js";
import { ErrorHandler } from "../../middleware/errorHandler.js";
import { auditService } from "../../services/audit.services.js";
import { pagination } from "../../utils/pagination.js";
import { incomeCategoryRepository } from "../category/income/income.category.repository.js";
import { updateIncomeById } from "./income.controller.js";
import { incomeRepository } from "./income.repository.js";
import { GetIncomeQuery } from "./income.schema.js";
import {
  CreateIncomeData,
  CreateIncomeRequest,
  UpdateIncomeData,
} from "./income.types.js";

export const incomeService = {
  create: async (
    data: CreateIncomeRequest,
    userId: string,
    ipAddress: string,
  ) => {
    const category = await incomeRepository.findIncomeCategoryById(
      data.incomeCategoryId,
    );
    if (!category) {
      throw new ErrorHandler(404, "Such category doesnt exists");
    }
    const databaseObj = {
      ...data,
      createdById: userId,
    };
    const result = await incomeRepository.create(databaseObj);
    await auditService.log(
      userId,
      "CREATE",
      "INCOME",
      result.id,
      null,
      result,
      ipAddress,
    );
    return result;
  },
  getIncome: async (query: GetIncomeQuery) => {
    const { page, limit, skip } = pagination(query);
    const where: Prisma.IncomeWhereInput = {
      deletedAt: null,
    };

    if (query.from && query.to) {
      where.transactionDate = {
        gte: new Date(query.from),
        lte: new Date(query.to),
      };
    }

    if (query.category) {
      where.incomeCategoryId = query.category;
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

    if (query.client_name) {
      where.clientName = {
        contains: query.client_name,
        mode: "insensitive",
      };
    }

    if (query.search) {
      where.OR = [
        {
          clientName: {
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
    const incomes = await incomeRepository.findMany(where, skip, limit);
    const total = await incomeRepository.count(where);
    const totalPages = Math.ceil(total / limit);

    return {
      data: incomes,
      metadata: {
        page,
        limit,
        totalPages,
        total,
      },
    };
  },
  getIncomeById: async (id: string) => {
    const income = await incomeRepository.findById(id);
    if (!income) {
      throw new ErrorHandler(404, "Income doesnt exists");
    }
    return income;
  },
  updateIncomeById: async (
    id: string,
    data: UpdateIncomeData,
    userId: string,
    ipAddress: string,
  ) => {
    const oldIncome = await incomeRepository.findById(id);
    if (data.incomeCategoryId) {
      const category = await incomeRepository.findIncomeCategoryById(
        data.incomeCategoryId,
      );

      if (!category) {
        throw new ErrorHandler(404, "Category not found");
      }
    }
    if (!oldIncome) throw new ErrorHandler(404, "Such income doesnt esixts");
    const updatedIncome = await incomeRepository.update(id, {
      ...data,
      updatedById: userId,
    });
    await auditService.log(
      userId,
      "UPDATE",
      "INCOME",
      id,
      oldIncome,
      updatedIncome,
      ipAddress,
    );
    return updatedIncome;
  },
  deleteIncomeById: async (id: string, userId: string, ipAddress: string) => {
    const income = await incomeRepository.findById(id);
    if (!income) {
      throw new ErrorHandler(404, "Such income doesnt exists");
    }
    await auditService.log(
      userId,
      "DELETE",
      "INCOME",
      id,
      income,
      null,
      ipAddress,
    );
    return incomeRepository.softDelete(id, userId);
  },
};
