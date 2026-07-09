import cookieParser from 'cookie-parser'
import express from 'express'
import helmet from 'helmet'

const app=express()


app.use(express.json())
app.use(cookieParser())
app.use(helmet()); 


export default app