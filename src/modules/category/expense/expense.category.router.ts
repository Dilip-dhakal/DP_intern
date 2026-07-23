import { Router } from "express";

import {
  createExpensesCategory,
  getExpenseCategories,
  updatedByID,
  deletedById,
  getExpenseCategoryById,
} from "./expense.category.controller.js";

import { authGuard } from "../../../middleware/authGuard.js";

const router = Router();

/**
 * @swagger
 * /expense-category:
 *   post:
 *     summary: Create a new expense category
 *     tags:
 *       - Expense Category
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Expense category created successfully
 */
router.post("/", authGuard, createExpensesCategory);

/**
 * @swagger
 * /expense-category:
 *   get:
 *     summary: Get all expense categories
 *     tags:
 *       - Expense Category
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Expense categories fetched successfully
 */
router.get("/", authGuard, getExpenseCategories);

/**
 * @swagger
 * /expense-category/{id}:
 *   get:
 *     summary: Get expense category by ID
 *     tags:
 *       - Expense Category
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
 *         description: Expense category fetched successfully
 *       404:
 *         description: Expense category not found
 */
router.get("/:id", authGuard, getExpenseCategoryById);

/**
 * @swagger
 * /expense-category/{id}:
 *   patch:
 *     summary: Update expense category
 *     tags:
 *       - Expense Category
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
 *         description: Expense category updated successfully
 *       404:
 *         description: Expense category not found
 */
router.patch("/:id", authGuard, updatedByID);

/**
 * @swagger
 * /expense-category/{id}:
 *   delete:
 *     summary: Delete expense category
 *     tags:
 *       - Expense Category
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
 *         description: Expense category deleted successfully
 *       404:
 *         description: Expense category not found
 */
router.delete("/:id", authGuard, deletedById);

export default router;