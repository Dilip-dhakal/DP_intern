import express from "express";
import { authGuard } from "../../middleware/authGuard.js";
import {
  createExpense,
  deleteExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
} from "./expense.controller.js";

const router = express.Router();

/**
 * @swagger
 * /expense:
 *   post:
 *     summary: Create a new expense
 *     tags:
 *       - Expense
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateExpenseRequest'
 *     responses:
 *       201:
 *         description: Expense created successfully
 */
router.post("/", authGuard, createExpense);

/**
 * @swagger
 * /expense:
 *   get:
 *     summary: Get all expenses
 *     tags:
 *       - Expense
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
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
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: payment_method
 *         schema:
 *           type: string
 *       - in: query
 *         name: amount_min
 *         schema:
 *           type: number
 *       - in: query
 *         name: amount_max
 *         schema:
 *           type: number
 *       - in: query
 *         name: vendor_name
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Expenses fetched successfully
 */
router.get("/", authGuard, getAllExpenses);

/**
 * @swagger
 * /expense/{id}:
 *   get:
 *     summary: Get expense by ID
 *     tags:
 *       - Expense
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Expense fetched successfully
 *       404:
 *         description: Expense not found
 */
router.get("/:id", authGuard, getExpenseById);

/**
 * @swagger
 * /expense/{id}:
 *   patch:
 *     summary: Update expense
 *     tags:
 *       - Expense
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateExpenseRequest'
 *     responses:
 *       200:
 *         description: Expense updated successfully
 */
router.patch("/:id", authGuard, updateExpense);

/**
 * @swagger
 * /expense/{id}:
 *   delete:
 *     summary: Delete expense
 *     tags:
 *       - Expense
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Expense deleted successfully
 */
router.delete("/:id", authGuard, deleteExpense);

export default router;