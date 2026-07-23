import { z } from "zod";
import { PaymentMethod } from "../../generated/prisma/index.js";
import { groupTransactions } from "../../utils/report.js";

export const transactionReportSchema = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
  category_id: z.uuid().optional(),
  payment_method: z.nativeEnum(PaymentMethod).optional(),
  format: z
    .enum(["json", "csv", "excel", "pdf"])
    .default("json"),
});


export const profitLossSchema = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
  group_by: z
    .enum(["daily", "weekly","monthly", "yearly"])
    .default("monthly"),
  format: z
    .enum(["json", "csv", "excel", "pdf"])
    .default("json"),
});

export const categoryReportSchema = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
  format: z
    .enum(["json", "csv", "excel", "pdf"])
    .default("json"),
});

export const yearlySummarySchema = z.object({
  year: z.coerce.number(),
  format: z
    .enum(["json", "csv", "excel", "pdf"])
    .default("json"),
});

export const profitLossReportSchema = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
  group_by: z
    .enum(["daily","weekly", "monthly", "yearly"])
    .default("monthly"),
  format: z
    .enum(["json", "csv", "excel", "pdf"])
    .default("json"),
});