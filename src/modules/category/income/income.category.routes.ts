import { Router } from "express";

import {
  createIncomeCategory,
  getIncomeCategories,
  getIncomeCategoryById,
  updateIncomeCategoryById,
  deleteIncomeCategoryById,
} from "./income.category.controller.js";

import { authGuard } from "../../../middleware/authGuard.js";

const router = Router();

/**
 * @swagger
 * /income-category:
 *   post:
 *     summary: Create a new income category
 *     tags:
 *       - Income Category
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Income category created successfully
 */
router.post("/", authGuard, createIncomeCategory);

/**
 * @swagger
 * /income-category:
 *   get:
 *     summary: Get all income categories
 *     tags:
 *       - Income Category
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Income categories fetched successfully
 */
router.get("/", authGuard, getIncomeCategories);

/**
 * @swagger
 * /income-category/{id}:
 *   get:
 *     summary: Get income category by ID
 *     tags:
 *       - Income Category
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
 *         description: Income category fetched successfully
 *       404:
 *         description: Income category not found
 */
router.get("/:id", authGuard, getIncomeCategoryById);

/**
 * @swagger
 * /income-category/{id}:
 *   patch:
 *     summary: Update income category
 *     tags:
 *       - Income Category
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
 *         description: Income category updated successfully
 *       404:
 *         description: Income category not found
 */
router.patch("/:id", authGuard, updateIncomeCategoryById);

/**
 * @swagger
 * /income-category/{id}:
 *   delete:
 *     summary: Delete income category
 *     tags:
 *       - Income Category
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
 *         description: Income category deleted successfully
 *       404:
 *         description: Income category not found
 */
router.delete("/:id", authGuard, deleteIncomeCategoryById);

export default router;