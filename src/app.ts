import cookieParser from 'cookie-parser'
import express from 'express'
import helmet from 'helmet'
import authRoutes from "./modules/auth/auth.routes.js"
import incomeRoutes from "./modules/income/income.router.js"
const app=express()


app.use(express.json())
app.use(cookieParser())
app.use(helmet()); 


app.use("/api/auth",authRoutes)
app.use("/api/income",incomeRoutes)

export default app