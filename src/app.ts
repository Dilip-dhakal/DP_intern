import cookieParser from 'cookie-parser'
import express from 'express'
import helmet from 'helmet'
import authRoutes from "./modules/auth/auth.routes.js"

const app=express()


app.use(express.json())
app.use(cookieParser())
app.use(helmet()); 


app.use("/api/auth",authRoutes)

export default app