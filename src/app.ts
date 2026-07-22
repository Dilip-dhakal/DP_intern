import cookieParser from 'cookie-parser'
import express from 'express'
import helmet from 'helmet'
import authRoutes from "./modules/auth/auth.routes.js"
import incomeRoutes from "./modules/income/income.router.js"
import morgan from 'morgan'
import expenseRoutes from "./modules/expense/expense.router.js"
import incomeCategoryRoutes from "./modules/category/income/income.category.routes.js"
import expenseCategoryroutes from "./modules/category/expense/expense.category.router.js"
import { rateLimiter } from './middleware/rateLimiter.js'
import attachmentRoutes from "./modules/attachments/attachment.routes.js"
import { env } from './config/env.js'
import noteRoutes from "./modules/notes/note.routes.js"
import reminderRoutes from "./modules/reminder/reminder.routes.js"
import reportRoutes from "./modules/reports/report.routes.js"

const app=express()


app.use(express.json())
app.use(cookieParser())
app.use(helmet()); 
app.use(morgan("dev"))
app.use(rateLimiter)


app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/income",incomeRoutes)
app.use("/api/v1/expense",expenseRoutes)

app.use("/api/v1/income-category",incomeCategoryRoutes)
app.use("/api/v1/expense-category",expenseCategoryroutes)
app.use("/api/v1/attachment",attachmentRoutes)
app.use("/api/v1/notes",noteRoutes)
app.use("/api/v1/reminder",reminderRoutes)
app.use("/api/v1/report",reportRoutes)




export default app