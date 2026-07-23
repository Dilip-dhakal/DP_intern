import { Request, Response } from "express";
import { dashboardService } from "./dashboard.service.js";
import { sendResponse } from "../../utils/response.js";
import {
  dashboardSummarySchema,
  categoryChartSchema,
  barChartSchema,
  monthlyCashFlowSchema,
} from "./dashboard.schema.js";

export const getDashboardSummary = async (
  req: Request,
  res: Response
) => {
  const query = dashboardSummarySchema.parse(req.query);

  const result =
    await dashboardService.getDashboardSummary(query);

  return sendResponse(
    res,
    200,
    "Dashboard summary fetched successfully",
    result
  );
};

export const getRecentTransactions = async (
  req: Request,
  res: Response
) => {
  const result =
    await dashboardService.getRecentTransactions();

  return sendResponse(
    res,
    200,
    "Recent transactions fetched successfully",
    result
  );
};

export const getUpcomingReminders = async (
  req: Request,
  res: Response
) => {
  const result =
    await dashboardService.getUpcomingReminders();

  return sendResponse(
    res,
    200,
    "Upcoming reminders fetched successfully",
    result
  );
};

export const getIncomeByCategory = async (
  req: Request,
  res: Response
) => {
  const result =
    await dashboardService.getIncomeByCategory();

  return sendResponse(
    res,
    200,
    "Income by category fetched successfully",
    result
  );
};

export const getIncomeCategoryChart = async (
  req: Request,
  res: Response
) => {
  const query = categoryChartSchema.parse(req.query);

  const result =
    await dashboardService.getIncomeCategoryChart(query);

  return sendResponse(
    res,
    200,
    "Income category chart fetched successfully",
    result
  );
};

export const getExpenseCategoryChart = async (
  req: Request,
  res: Response
) => {
  const query = categoryChartSchema.parse(req.query);

  const result =
    await dashboardService.getExpenseCategoryChart(query);

  return sendResponse(
    res,
    200,
    "Expense category chart fetched successfully",
    result
  );
};

export const getBarChart = async (
  req: Request,
  res: Response
) => {
  const query = barChartSchema.parse(req.query);

  const result =
    await dashboardService.getBarChart(query);

  return sendResponse(
    res,
    200,
    "Bar chart fetched successfully",
    result
  );
};

export const getMonthlyCashFlow = async (
  req: Request,
  res: Response
) => {
  const query =
    monthlyCashFlowSchema.parse(req.query);

  const result =
    await dashboardService.getMonthlyCashFlow(query);

  return sendResponse(
    res,
    200,
    "Monthly cash flow fetched successfully",
    result
  );
};