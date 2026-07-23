import { Prisma } from "../../generated/prisma/index.js";
import { expenseCategoryRepository } from "../category/expense/expense.category.repository.js";
import { incomeCategoryRepository } from "../category/income/income.category.repository.js";
import { expenseRepository } from "../expense/expense.repository.js";
import { dashboardRepository } from "./dashboard.repository.js";
import {
    BarChartQuery,
  CategoryChartQuery,
  DashboardSummaryQuery,
  MonthlyCashFlowQuery,
} from "./dashboard.schema.js";

export const dashboardService = {
  getDashboardSummary: async (query: DashboardSummaryQuery) => {
    const now = new Date();

    const selectedYear = query.year ?? now.getFullYear();

    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date(now);
    endOfToday.setHours(23, 59, 59, 999);

    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );

    const startOfYear = new Date(selectedYear, 0, 1);

    const endOfYear = new Date(
      selectedYear,
      11,
      31,
      23,
      59,
      59,
      999
    );

    const createIncomeWhere = (
      from: Date,
      to: Date
    ): Prisma.IncomeWhereInput => ({
      deletedAt: null,
      transactionDate: {
        gte: from,
        lte: to,
      },
    });

    const createExpenseWhere = (
      from: Date,
      to: Date
    ): Prisma.ExpenseWhereInput => ({
      deletedAt: null,
      transactionDate: {
        gte: from,
        lte: to,
      },
    });

    const [
      todayIncome,
      todayExpense,
      weekIncome,
      weekExpense,
      monthIncome,
      monthExpense,
      yearIncome,
      yearExpense,
    ] = await Promise.all([
      dashboardRepository.getIncomeTotal(
        createIncomeWhere(startOfToday, endOfToday)
      ),
      dashboardRepository.getExpenseTotal(
        createExpenseWhere(startOfToday, endOfToday)
      ),

      dashboardRepository.getIncomeTotal(
        createIncomeWhere(startOfWeek, endOfWeek)
      ),
      dashboardRepository.getExpenseTotal(
        createExpenseWhere(startOfWeek, endOfWeek)
      ),

      dashboardRepository.getIncomeTotal(
        createIncomeWhere(startOfMonth, endOfMonth)
      ),
      dashboardRepository.getExpenseTotal(
        createExpenseWhere(startOfMonth, endOfMonth)
      ),

      dashboardRepository.getIncomeTotal(
        createIncomeWhere(startOfYear, endOfYear)
      ),
      dashboardRepository.getExpenseTotal(
        createExpenseWhere(startOfYear, endOfYear)
      ),
    ]);

    return {
      today: {
        income: Number(todayIncome._sum.amount ?? 0),
        expense: Number(todayExpense._sum.amount ?? 0),
        profit:
          Number(todayIncome._sum.amount ?? 0) -
          Number(todayExpense._sum.amount ?? 0),
      },

      week: {
        income: Number(weekIncome._sum.amount ?? 0),
        expense: Number(weekExpense._sum.amount ?? 0),
        profit:
          Number(weekIncome._sum.amount ?? 0) -
          Number(weekExpense._sum.amount ?? 0),
      },

      month: {
        income: Number(monthIncome._sum.amount ?? 0),
        expense: Number(monthExpense._sum.amount ?? 0),
        profit:
          Number(monthIncome._sum.amount ?? 0) -
          Number(monthExpense._sum.amount ?? 0),
      },

      year: {
        income: Number(yearIncome._sum.amount ?? 0),
        expense: Number(yearExpense._sum.amount ?? 0),
        profit:
          Number(yearIncome._sum.amount ?? 0) -
          Number(yearExpense._sum.amount ?? 0),
      },
    };
  },

  getRecentTransactions: async () => {
    const [incomes, expenses] = await Promise.all([
      dashboardRepository.getRecentIncomes(),
      dashboardRepository.getRecentExpenses(),
    ]);

    const incomeData = incomes.map((income) => ({
      id: income.id,
      type: "INCOME",
      transactionDate: income.transactionDate,
      amount: Number(income.amount),
      category: income.incomeCategory.name,
      paymentMethod: income.paymentMethod,
      description: income.description,
      clientVendor:
        income.clientName ?? income.incomeSource,
    }));

    const expenseData = expenses.map((expense) => ({
      id: expense.id,
      type: "EXPENSE",
      transactionDate: expense.transactionDate,
      amount: Number(expense.amount),
      category: expense.expenseCategory.name,
      paymentMethod: expense.paymentMethod,
      description: expense.description,
      clientVendor: expense.vendorName,
    }));

    const transactions = [
      ...incomeData,
      ...expenseData,
    ];

    transactions.sort(
      (a, b) =>
        b.transactionDate.getTime() -
        a.transactionDate.getTime()
    );

    return transactions.slice(0, 20);
  },

  getUpcomingReminders: async () => {
    return dashboardRepository.getUpcomingReminders();
  },

  getIncomeByCategory: async () => {
    const grouped =
      await dashboardRepository.getIncomeByCategory();

    return Promise.all(
      grouped.map(async (item) => {
        const category =
          await incomeCategoryRepository.findById(
            item.incomeCategoryId
          );

        return {
          category: category?.name,
          total: Number(item._sum.amount ?? 0),
        };
      })
    );
  },

  getIncomeCategoryChart: async (
    query: CategoryChartQuery
  ) => {
    const where: Prisma.IncomeWhereInput = {
      deletedAt: null,
    };

    if (query.from && query.to) {
      where.transactionDate = {
        gte: new Date(query.from),
        lte: new Date(query.to),
      };
    }

    const grouped =
      await dashboardRepository.getIncomeCategoryChart(
        where
      );

    return Promise.all(
      grouped.map(async (item) => {
        const category =
          await incomeCategoryRepository.findById(
            item.incomeCategoryId
          );

        return {
          category: category?.name,
          amount: Number(item._sum.amount ?? 0),
        };
      })
    );
  },
  
getExpenseCategoryChart: async (
  query: CategoryChartQuery
) => {
  const where: Prisma.ExpenseWhereInput = {
    deletedAt: null,
  };

  if (query.from && query.to) {
    where.transactionDate = {
      gte: new Date(query.from),
      lte: new Date(query.to),
    };
  }

  const grouped =
    await dashboardRepository.getExpenseCategoryChart(
      where
    );

  const result = await Promise.all(
    grouped.map(async (item) => {
      const category =
        await expenseCategoryRepository.findById(
          item.expenseCategoryId
        );

      return {
        category: category?.name,
        amount: Number(item._sum.amount ?? 0),
      };
    })
  );

  return result;
},
getBarChart: async (query: BarChartQuery) => {
  const incomeWhere: Prisma.IncomeWhereInput = {
    deletedAt: null,
  };

  const expenseWhere: Prisma.ExpenseWhereInput = {
    deletedAt: null,
  };

  const [incomes, expenses] = await Promise.all([
    dashboardRepository.getBarChartIncome(incomeWhere),
    dashboardRepository.getBarChartExpense(expenseWhere),
  ]);

  const chart: Record<
    string,
    {
      income: number;
      expense: number;
    }
  > = {};

  const getLabel = (date: Date) => {
    switch (query.period) {
      case "daily":
        return date.toLocaleDateString("en-US", {
          weekday: "short",
        });

      case "weekly":
        return `Week ${Math.ceil(date.getDate() / 7)}`;

      case "monthly":
        return date.toLocaleDateString("en-US", {
          month: "short",
        });

      case "yearly":
        return date.getFullYear().toString();
    }
  };

  incomes.forEach((income) => {
    const label = getLabel(income.transactionDate);

    if (!chart[label]) {
      chart[label] = {
        income: 0,
        expense: 0,
      };
    }

    chart[label].income += Number(income.amount);
  });

  expenses.forEach((expense) => {
    const label = getLabel(expense.transactionDate);

    if (!chart[label]) {
      chart[label] = {
        income: 0,
        expense: 0,
      };
    }

    chart[label].expense += Number(expense.amount);
  });

  return Object.entries(chart).map(([label, value]) => ({
    label,
    income: value.income,
    expense: value.expense,
    profit: value.income - value.expense,
  }));
},
getMonthlyCashFlow: async (
  query: MonthlyCashFlowQuery
) => {
  const startOfYear = new Date(query.year, 0, 1);

  const endOfYear = new Date(
    query.year,
    11,
    31,
    23,
    59,
    59,
    999
  );

  const incomeWhere: Prisma.IncomeWhereInput = {
    deletedAt: null,
    transactionDate: {
      gte: startOfYear,
      lte: endOfYear,
    },
  };

  const expenseWhere: Prisma.ExpenseWhereInput = {
    deletedAt: null,
    transactionDate: {
      gte: startOfYear,
      lte: endOfYear,
    },
  };

  const [incomes, expenses] = await Promise.all([
    dashboardRepository.getMonthlyCashFlowIncome(incomeWhere),
    dashboardRepository.getMonthlyCashFlowExpense(expenseWhere),
  ]);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const result = monthNames.map((month) => ({
    month,
    income: 0,
    expense: 0,
    profit: 0,
  }));

  incomes.reduce((_, income) => {
    const index = income.transactionDate.getMonth();
    result[index].income += Number(income.amount);
    return _;
  }, null);

  expenses.reduce((_, expense) => {
    const index = expense.transactionDate.getMonth();
    result[index].expense += Number(expense.amount);
    return _;
  }, null);

  return result.map((item) => ({
    ...item,
    profit: item.income - item.expense,
  }));
},
};