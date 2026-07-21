import {Request,Response} from 'express'
import { authService } from './auth.service.js'
import { loginSchema, registerSchema } from './auth.schema.js'
import { sendResponse } from '../../shared/response.js'


export const registerUser=async (req:Request,res:Response)=>{
    const { body } = registerSchema.parse({
        body:req.body
    })
    const result = await authService.register(body)
    return sendResponse(res, 201, "User registered successfully", result)
}

export const loginUser=async(req:Request,res:Response)=>{
    const ipAddress=req.headers["x-forwarded-for"]||req.ip
    const {body}=loginSchema.parse({
        body:req.body
    })
    const result=await authService.login(body.email,body.password,ipAddress as string)
    return sendResponse(res, 200, "User logged in successfully", result)
}