import { z } from "zod";

import {
 transactionReportSchema,
  profitLossSchema,
  categoryReportSchema,
  yearlySummarySchema,
} from "./report.schema.js";

export type TransactionReportQuery = z.infer<typeof transactionReportSchema>;
export type ProfitLossQuery = z.infer<typeof profitLossSchema>;
export type CategoryReportQuery = z.infer<typeof categoryReportSchema>;
export type YearlySummaryQuery = z.infer<typeof yearlySummarySchema>;
