import { Request, Response } from "express";
import { sendResponse } from "../../utils/response.js";

import {
  transactionReportSchema,
  profitLossReportSchema,
} from "./report.schema.js";

import { reportService } from "./report.service.js";

export const getIncomeReport = async (
  req: Request,
  res: Response
) => {
  const query = transactionReportSchema.parse(req.query);

  const result = await reportService.getIncomeReport(query);

  return sendResponse(
    res,
    200,
    "Income report generated successfully",
    result
  );
};

export const getExpenseReport = async (
  req: Request,
  res: Response
) => {
  const query = transactionReportSchema.parse(req.query);

  const result = await reportService.getExpenseReport(query);

  return sendResponse(
    res,
    200,
    "Expense report generated successfully",
    result
  );
};

export const getProfitLossReport = async (
  req: Request,
  res: Response
) => {
  const query = profitLossReportSchema.parse(req.query);

  const result = await reportService.getProfitLossReport(query);

  return sendResponse(
    res,
    200,
    "Profit & Loss report generated successfully",
    result
  );
};