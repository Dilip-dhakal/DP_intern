import { z } from "zod";

export const dashboardSummarySchema = z.object({
  year: z.coerce.number().int().optional(),
});


export const categoryChartSchema = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
});

export const barChartSchema = z.object({
  period: z.enum([
    "daily",
    "weekly",
    "monthly",
    "yearly",
  ]),
});

export const monthlyCashFlowSchema = z.object({
  year: z.coerce.number().int(),
});

export type MonthlyCashFlowQuery =
  z.infer<typeof monthlyCashFlowSchema>;

export type BarChartQuery = z.infer<
  typeof barChartSchema
>;
export type CategoryChartQuery = z.infer<
  typeof categoryChartSchema
>;
export type DashboardSummaryQuery = z.infer<typeof dashboardSummarySchema>;
