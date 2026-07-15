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

router.post("/", authGuard, createIncomeCategory);

router.get("/", authGuard, getIncomeCategories);

router.get("/:id", authGuard, getIncomeCategoryById);

router.patch("/:id", authGuard, updateIncomeCategoryById);

router.delete("/:id", authGuard, deleteIncomeCategoryById);

export default router;
