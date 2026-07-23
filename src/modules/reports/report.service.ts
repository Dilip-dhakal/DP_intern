import { Prisma } from "../../generated/prisma/index.js";
import { exportCsv } from "../../utils/exportCsv.js";
import { exportExcel } from "../../utils/exportExcel.js";
import { exportPdf } from "../../utils/exportPdf.js";
import { groupTransactions } from "../../utils/report.js";
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
    const exportData = result.map((item) => ({
  transactionDate: item.transactionDate
    .toISOString()
    .split("T")[0],
  amount: Number(item.amount),
  clientName: item.clientName,
  paymentMethod: item.paymentMethod,
  category: item.incomeCategory.name,
}));
if (query.format === "csv") {
  return exportCsv(exportData);
}
if (query.format === "excel") {
  return exportExcel(exportData);
}
if (query.format === "pdf") {
  return exportPdf(exportData);
}
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
    const exportData = result.map((item) => ({
  transactionDate: item.transactionDate
    .toISOString()
    .split("T")[0],
  amount: Number(item.amount),
  clientName: item.vendorName,
  paymentMethod: item.paymentMethod,
  category: item.expenseCategory.name,
}));
    if (query.format === "csv") {
  return exportCsv(exportData);
}
if (query.format === "excel") {
  return exportExcel(exportData);
}
if (query.format === "pdf") {
  return exportPdf(exportData);
}

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

  const [incomeTransactions, expenseTransactions] =
    await Promise.all([
      reportRepository.getIncomeTransactions(incomeWhere),
      reportRepository.getExpenseTransactions(expenseWhere),
    ]);

  const groupedIncome = groupTransactions(
    incomeTransactions,
    query.group_by
  );

  const groupedExpense = groupTransactions(
    expenseTransactions,
    query.group_by
  );

  const periods = Array.from(
    new Set([
      ...groupedIncome.map((item) => item.period),
      ...groupedExpense.map((item) => item.period),
    ])
  );

  const reportData = periods.map((period) => {
  const income =
    groupedIncome.find((item) => item.period === period)?.total ?? 0;

  const expense =
    groupedExpense.find((item) => item.period === period)?.total ?? 0;

  return {
    period,
    totalIncome: income,
    totalExpense: expense,
    netProfit: income - expense,
  };
});
const exportData = reportData.map((item) => ({
  Period: item.period,
  "Total Income": item.totalIncome,
  "Total Expense": item.totalExpense,
  "Net Profit": item.netProfit,
}));

if (query.format === "csv") {
  return exportCsv(exportData);
}
if(query.format==="excel"){
    return exportExcel(exportData);
}

if(query.format==="pdf"){
    return exportPdf(exportData);
}
return reportData;
},
};
