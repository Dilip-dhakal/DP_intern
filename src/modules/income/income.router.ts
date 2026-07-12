import express from 'express'
import { authGuard } from '../../middleware/authGuard.js'
import { createIncome, getIncome } from './income.controller.js'

const router=express.Router()

router.post("/",authGuard,createIncome)
router.get("/",authGuard,getIncome)

export default router