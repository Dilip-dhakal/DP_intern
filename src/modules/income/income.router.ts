import express from "express";
import { authGuard } from "../../middleware/authGuard.js";
import {
  createIncome,
  deleteIncomeById,
  getIncome,
  getIncomeById,
  updateIncomeById,
} from "./income.controller.js";
import { rateLimiter } from "../../middleware/rateLimiter.js";

const router = express.Router();

/**
 * @swagger
 * /income:
 *   post:
 *     summary: Create a new income
 *     tags:
 *       - Income
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateIncomeRequest'
 *     responses:
 *       201:
 *         description: Income created successfully
 */
router.post("/", authGuard, rateLimiter, createIncome);

/**
 * @swagger
 * /income:
 *   get:
 *     summary: Get all income records
 *     tags:
 *       - Income
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
 *         name: client_name
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Income records fetched successfully
 */
router.get("/", authGuard, rateLimiter, getIncome);

/**
 * @swagger
 * /income/{id}:
 *   get:
 *     summary: Get income by ID
 *     tags:
 *       - Income
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
 *         description: Income fetched successfully
 *       404:
 *         description: Income not found
 */
router.get("/:id", authGuard, rateLimiter, getIncomeById);

/**
 * @swagger
 * /income/{id}:
 *   patch:
 *     summary: Update income
 *     tags:
 *       - Income
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
 *             $ref: '#/components/schemas/UpdateIncomeRequest'
 *     responses:
 *       200:
 *         description: Income updated successfully
 */
router.patch("/:id", authGuard, rateLimiter, updateIncomeById);

/**
 * @swagger
 * /income/{id}:
 *   delete:
 *     summary: Delete income
 *     tags:
 *       - Income
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
 *         description: Income deleted successfully
 */
router.delete("/:id", authGuard, rateLimiter, deleteIncomeById);

export default router;