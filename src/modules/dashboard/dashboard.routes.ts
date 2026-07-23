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
  getMonthlyCashFlow,
} from "./dashboard.controller.js";

const router = Router();

/**
 * @swagger
 * /dashboard/summary:
 *   get:
 *     summary: Get dashboard KPI summary
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         required: false
 *         example: 2026
 *     responses:
 *       200:
 *         description: Dashboard summary fetched successfully
 */
router.get("/summary", authGuard, getDashboardSummary);

/**
 * @swagger
 * /dashboard/recent-transactions:
 *   get:
 *     summary: Get latest 20 income and expense transactions
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recent transactions fetched successfully
 */
router.get("/recent-transactions", authGuard, getRecentTransactions);

/**
 * @swagger
 * /dashboard/upcoming-reminders:
 *   get:
 *     summary: Get reminders due within the next 7 days
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Upcoming reminders fetched successfully
 */
router.get("/upcoming-reminders", authGuard, getUpcomingReminders);

/**
 * @swagger
 * /dashboard/income-by-category:
 *   get:
 *     summary: Get total income grouped by category
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Income by category fetched successfully
 */
router.get("/income-by-category", authGuard, getIncomeByCategory);

/**
 * @swagger
 * /dashboard/income-category-chart:
 *   get:
 *     summary: Get income category chart data
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Income category chart fetched successfully
 */
router.get(
  "/income-category-chart",
  authGuard,
  getIncomeCategoryChart
);

/**
 * @swagger
 * /dashboard/expense-category-chart:
 *   get:
 *     summary: Get expense category chart data
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Expense category chart fetched successfully
 */
router.get(
  "/expense-category-chart",
  authGuard,
  getExpenseCategoryChart
);

/**
 * @swagger
 * /dashboard/bar-chart:
 *   get:
 *     summary: Get income vs expense bar chart data
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         required: true
 *         schema:
 *           type: string
 *           enum:
 *             - daily
 *             - weekly
 *             - monthly
 *             - yearly
 *         example: monthly
 *     responses:
 *       200:
 *         description: Bar chart data fetched successfully
 */
router.get("/bar-chart", authGuard, getBarChart);

/**
 * @swagger
 * /dashboard/monthly-cash-flow:
 *   get:
 *     summary: Get monthly cash flow for a selected year
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         example: 2026
 *     responses:
 *       200:
 *         description: Monthly cash flow fetched successfully
 */
router.get(
  "/monthly-cash-flow",
  authGuard,
  getMonthlyCashFlow
);

export default router;