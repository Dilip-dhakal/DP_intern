import { Router } from "express";
import { authGuard } from "../../middleware/authGuard.js";
import {
  getDashboardSummary,
  getIncomeByCategory,
  getRecentTransactions,
  getUpcomingReminders,
  getIncomeCategoryChart, 
  getExpenseCategoryChart,  
  getBarChart,
  getMonthlyCashFlow
} from "./dashboard.controller.js";

const router = Router();

router.get("/summary", authGuard, getDashboardSummary);
router.get("/recent-transactions", authGuard, getRecentTransactions);
router.get("/upcoming-reminders", authGuard, getUpcomingReminders);
router.get("/income-by-category", authGuard, getIncomeByCategory);
router.get("/income-category-chart", authGuard, getIncomeCategoryChart);
router.get(
  "/expense-category-chart",
  authGuard,
  getExpenseCategoryChart
);
router.get(
  "/bar-chart",
  authGuard,
  getBarChart
);
router.get(
  "/monthly-cash-flow",
  authGuard,
  getMonthlyCashFlow
);
export default router;