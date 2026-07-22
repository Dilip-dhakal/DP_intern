import { Router } from "express";
import { authGuard } from "../../middleware/authGuard.js";
import { getExpenseReport, getIncomeReport, getProfitLossReport } from "./report.controller.js";

const router = Router();

router.get("/income",authGuard,getIncomeReport);
router.get("/expense",authGuard,getExpenseReport);
router.get("/profit-loss",authGuard,getProfitLossReport);

export default router;