import express from 'express'
import { authGuard } from '../../middleware/authGuard.js'
import { createExpense, deleteExpense, getAllExpenses, getExpenseById, updateExpense } from './expense.controller.js'

const router=express.Router()

router.post("/",authGuard,createExpense)
router.get("/",authGuard,getAllExpenses)
router.get("/:id",authGuard,getExpenseById)
router.patch("/:id",authGuard,updateExpense)
router.delete("/:id",authGuard,deleteExpense)


export default router
