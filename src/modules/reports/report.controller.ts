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
  console.log(query.format);

  const result = await reportService.getIncomeReport(query);
  console.log(query.format,"After servie");

  if (query.format === "csv") {
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="income-report.csv"'
    );

    return res.send(result);
  }
  if(query.format==="excel"){
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="income-report.xlsx"'
    );

    return res.send(result);
}
if(query.format==="pdf"){
    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="income-report.pdf"'
    );

    return res.send(result);
}

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

  if(query.format==="csv"){
     res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="expense-report.csv"'
    )
    
  }
  if(query.format==="excel"){
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="income-report.xlsx"'
    );

    return res.send(result);
}

if(query.format==="pdf"){
    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="income-report.pdf"'
    );

    return res.send(result);
}

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
  console.log(query.format);
  if(query.format==="csv"){
     res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="profit-loss-report.csv"'
    )
  }
  if(query.format==="excel"){
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="income-report.xlsx"'
    );

    return res.send(result);
}
if(query.format==="pdf"){
    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="income-report.pdf"'
    );

    return res.send(result);
}
  return sendResponse(
    res,
    200,
    "Profit & Loss report generated successfully",
    result
  );

}