import { Prisma } from "../../generated/prisma/index.js";
import { reportRepository } from "./report.repository.js";
import {
  TransactionReportQuery,
  ProfitLossQuery,
} from "./report.types.js";

export const reportService = {
  getIncomeReport: async (query: TransactionReportQuery) => {
    const where: Prisma.IncomeWhereInput = {
      deletedAt: null,
    };

    if (query.from && query.to) {
      where.transactionDate = {
        gte: new Date(query.from),
        lte: new Date(query.to),
      };
    }

    if (query.category_id) {
      where.incomeCategoryId = query.category_id;
    }

    if (query.payment_method) {
      where.paymentMethod = query.payment_method;
    }

    const result = await reportRepository.getIncomeReport(where);

    return result;
  },
  getExpenseReport: async (query: TransactionReportQuery) => {
    const where: Prisma.ExpenseWhereInput = {
      deletedAt: null,
    };
    if (query.from && query.to) {
      where.transactionDate = {
        gte: new Date(query.from),
        lte: new Date(query.to),
      };
    }

    if (query.category_id) {
      where.expenseCategoryId = query.category_id;
    }

    if (query.payment_method) {
      where.paymentMethod = query.payment_method;
    }
    const result = await reportRepository.getExpenseReport(where);
    return result;
  },
  getProfitLossReport: async (query: ProfitLossQuery) => {
    const incomeWhere: Prisma.IncomeWhereInput = {
      deletedAt: null,
    };

    const expenseWhere: Prisma.ExpenseWhereInput = {
      deletedAt: null,
    };

    if (query.from && query.to) {
      incomeWhere.transactionDate = {
        gte: new Date(query.from),
        lte: new Date(query.to),
      };

      expenseWhere.transactionDate = {
        gte: new Date(query.from),
        lte: new Date(query.to),
      };
    }

    const [incomeResult, expenseResult] = await Promise.all([
      reportRepository.getTotalIncome(incomeWhere),
      reportRepository.getTotalExpense(expenseWhere),
    ]);

    const totalIncome = Number(incomeResult._sum.amount ?? 0);
    const totalExpense = Number(expenseResult._sum.amount ?? 0);

    return {
      totalIncome,
      totalExpense,
      netProfit: totalIncome - totalExpense,
    };
  },
};
