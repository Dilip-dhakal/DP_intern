import cookieParser from 'cookie-parser'
import express from 'express'
import helmet from 'helmet'
import authRoutes from "./modules/auth/auth.routes.js"
import incomeRoutes from "./modules/income/income.router.js"
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
const app=express()


app.use(express.json())
app.use(cookieParser())
app.use(helmet()); 
app.use(morgan("dev"))
app.use(rateLimit)


app.use("/api/auth",authRoutes)
app.use("/api/income",incomeRoutes)


authRoutes.use(rateLimit({
    windowMs:60*60*1000,
    max:5
}))
export default app