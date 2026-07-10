import {Request,Response} from 'express'
import { authService } from './auth.service.js'
import { loginSchema, registerSchema } from './auth.schema.js'
import { success } from 'zod'


export const registerUser=async (req:Request,res:Response)=>{
    const { body } = registerSchema.parse({
        body:req.body
    })
    console.log("Bodys is getting",body)
    const result = await authService.register(body)
    return res.status(201).json({
        message:"User registered successfully",
        success:true,
        data:result
    })  
}

export const loginUser=async(req:Request,res:Response)=>{
    const {body}=loginSchema.parse({
        body:req.body
    })
    const result=await authService.login(body.email,body.password)
    return res.status(200).json({
        message:"User logged in successfully",
        success:true,
        data:result
    })
}