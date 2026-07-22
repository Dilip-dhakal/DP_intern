import prisma from "../../config/prisma.js";
import { Prisma } from "../../generated/prisma/index.js";

export const reportRepository = {
  getIncomeReport: async (where: Prisma.IncomeWhereInput) => {
    return prisma.income.findMany({
      where,
      select: {
        transactionDate: true,
        amount: true,
        clientName: true,
        paymentMethod: true,
        incomeCategory: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        transactionDate: "desc",
      },
    });
  },
  getExpenseReport: async (where: Prisma.ExpenseWhereInput) => {
    return prisma.expense.findMany({
      where,
      select: {
        transactionDate: true,
        amount: true,
        vendorName: true,
        paymentMethod: true,
        expenseCategory: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        transactionDate: "desc",
      },
    });
  },
  getTotalIncome: async (
    where: Prisma.IncomeWhereInput
  ) => {
    return prisma.income.aggregate({
      where,
      _sum: {
        amount: true,
      },
    });
  },

  getTotalExpense: async (
    where: Prisma.ExpenseWhereInput
  ) => {
    return prisma.expense.aggregate({
      where,
      _sum: {
        amount: true,
      },
    });
},
getIncomeTransactions: async (
  where: Prisma.IncomeWhereInput
) => {
  return prisma.income.findMany({
    where,
    select: {
      amount: true,
      transactionDate: true,
    },
    orderBy: {
      transactionDate: "asc",
    },
  });
},

getExpenseTransactions: async (
  where: Prisma.ExpenseWhereInput
) => {
  return prisma.expense.findMany({
    where,
    select: {
      amount: true,
      transactionDate: true,
    },
    orderBy: {
      transactionDate: "asc",
    },
  });
},
};
