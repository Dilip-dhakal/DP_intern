import cookieParser from 'cookie-parser'
import express from 'express'
import helmet from 'helmet'
import authRoutes from "./modules/auth/auth.routes.js"
import incomeRoutes from "./modules/income/income.router.js"
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import incomeCategoryRoutes from "./modules/category/income/income.category.routes.js"
import { rateLimiter } from './middleware/rateLimiter.js'

const app=express()


app.use(express.json())
app.use(cookieParser())
app.use(helmet()); 
app.use(morgan("dev"))
app.use(rateLimiter)


app.use("/api/auth",authRoutes)
app.use("/api/income",incomeRoutes)
app.use("/api/income-category",incomeCategoryRoutes)


export default app