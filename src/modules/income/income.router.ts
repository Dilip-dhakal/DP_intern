import express from 'express'
import { authGuard } from '../../middleware/authGuard.js'
import { createIncome, deleteIncomeById, getIncome, getIncomeById, updateIncomeById } from './income.controller.js'
import rateLimit from 'express-rate-limit'
import { rateLimiter } from '../../middleware/rateLimiter.js'

const router=express.Router()

router.post("/",authGuard,rateLimiter,createIncome)
router.get("/",authGuard,rateLimiter,getIncome)
router.get("/:id",authGuard,rateLimiter,getIncomeById)
router.patch("/:id",authGuard,rateLimiter,updateIncomeById)
router.delete("/:id",authGuard,rateLimiter,deleteIncomeById)
export default router