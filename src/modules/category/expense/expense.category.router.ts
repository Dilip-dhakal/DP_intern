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

router.post("/", authGuard, createExpensesCategory);

router.get("/", authGuard, getExpenseCategories);

router.get("/:id",authGuard, getExpenseCategoryById);

router.patch("/:id", authGuard, updatedByID);

router.delete("/:id", authGuard, deletedById);

export default router;
