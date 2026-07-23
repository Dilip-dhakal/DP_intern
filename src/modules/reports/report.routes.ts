import { Router } from "express";
import { authGuard } from "../../middleware/authGuard.js";
import {
  getExpenseReport,
  getIncomeReport,
  getProfitLossReport,
} from "./report.controller.js";

const router = Router();

/**
 * @swagger
 * /report/income:
 *   get:
 *     summary: Generate income report
 *     tags:
 *       - Report
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
 *       - in: query
 *         name: format
 *         schema:
 *           type: string
 *           enum:
 *             - pdf
 *             - csv
 *             - excel
 *         example: pdf
 *     responses:
 *       200:
 *         description: Income report generated successfully
 */
router.get("/income", authGuard, getIncomeReport);

/**
 * @swagger
 * /report/expense:
 *   get:
 *     summary: Generate expense report
 *     tags:
 *       - Report
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
 *       - in: query
 *         name: format
 *         schema:
 *           type: string
 *           enum:
 *             - pdf
 *             - csv
 *             - excel
 *         example: pdf
 *     responses:
 *       200:
 *         description: Expense report generated successfully
 */
router.get("/expense", authGuard, getExpenseReport);

/**
 * @swagger
 * /report/profit-loss:
 *   get:
 *     summary: Generate profit and loss report
 *     tags:
 *       - Report
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
 *       - in: query
 *         name: format
 *         schema:
 *           type: string
 *           enum:
 *             - pdf
 *             - csv
 *             - excel
 *         example: pdf
 *     responses:
 *       200:
 *         description: Profit and loss report generated successfully
 */
router.get("/profit-loss", authGuard, getProfitLossReport);

export default router;