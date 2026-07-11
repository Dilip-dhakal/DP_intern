import express from 'express'
import { authGuard } from '../../middleware/authGuard.js'
import { createIncome } from './income.controller.js'

const router=express.Router()

router.post("/",authGuard,createIncome)

export default router