import prisma from "../../config/prisma.js";
import { Prisma } from "../../generated/prisma/index.js";

export const dashboardRepository = {
  getIncomeTotal: async (
    where: Prisma.IncomeWhereInput
  ) => {
    return prisma.income.aggregate({
      where,
      _sum: {
        amount: true,
      },
    });
  },

  getExpenseTotal: async (
    where: Prisma.ExpenseWhereInput
  ) => {
    return prisma.expense.aggregate({
      where,
      _sum: {
        amount: true,
      },
    });
  },
  getRecentIncomes:async()=>{
    return await prisma.income.findMany({
  where: {
    deletedAt: null,
  },
  include:{
    incomeCategory:true
  },
  orderBy: {
    transactionDate: "desc",
  },
  take: 20,
});
  },
  getRecentExpenses:async()=>{
return await prisma.expense.findMany({
  where: {
    deletedAt: null,
  },
  include:{
    expenseCategory:true
  },
  orderBy: {
    transactionDate: "desc",
  },
  take: 20,
});
  },
  getUpcomingReminders: async () => {
  const today = new Date();
today.setHours(0, 0, 0, 0);

const nextWeek = new Date(today);
nextWeek.setDate(today.getDate() + 7);
nextWeek.setHours(23, 59, 59, 999);

  return prisma.reminder.findMany({
    where: {
      deletedAt: null,

      status: "PENDING",

      reminderDate: {
        gte: today,
        lte: nextWeek,
      },
    },

    orderBy: [
      {
        reminderDate: "asc",
      },
      {
        priority: "desc",
      },
    ],
  });
},
getIncomeByCategory: async () => {
  return prisma.income.groupBy({
    by: ["incomeCategoryId"],
    where: {
      deletedAt: null,
    },
    _sum: {
      amount: true,
    },
  });
},

getIncomeCategoryChart: async (
  where: Prisma.IncomeWhereInput
) => {
  return prisma.income.groupBy({
    by: ["incomeCategoryId"],
    where,
    _sum: {
      amount: true,
    },
  });
},
getExpenseCategoryChart: async (
  where: Prisma.ExpenseWhereInput
) => {
  return prisma.expense.groupBy({
    by: ["expenseCategoryId"],
    where,
    _sum: {
      amount: true,
    },
  });
},
// getAllIncomes: async () => {
//   return prisma.income.findMany({
//     where: {
//       deletedAt: null,
//     },
//   });
// },

// getAllExpenses: async () => {
//   return prisma.expense.findMany({
//     where: {
//       deletedAt: null,
//     },
//   });
getBarChartIncome: async (
  where: Prisma.IncomeWhereInput
) => {
  return prisma.income.findMany({
    where,
    select: {
      transactionDate: true,
      amount: true,
    },
  });
},

getBarChartExpense: async (
  where: Prisma.ExpenseWhereInput
) => {
  return prisma.expense.findMany({
    where,
    select: {
      transactionDate: true,
      amount: true,
    },
  });
},
getMonthlyCashFlowIncome: async (
  where: Prisma.IncomeWhereInput
) => {
  return prisma.income.findMany({
    where,
    select: {
      transactionDate: true,
      amount: true,
    },
  });
},

getMonthlyCashFlowExpense: async (
  where: Prisma.ExpenseWhereInput
) => {
  return prisma.expense.findMany({
    where,
    select: {
      transactionDate: true,
      amount: true,
    },
  });
},
};