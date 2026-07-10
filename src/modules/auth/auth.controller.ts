import {Request,Response} from 'express'
import { authService } from './auth.service.js'
import { registerSchema } from './auth.schema.js'
import { success } from 'zod'


export const registerUser=async (req:Request,res:Response)=>{
    const { body } = registerSchema.parse(req.body)
    console.log("Bodys is getting",body)
    const user = await authService.register(body)
    return res.status(201).json({
        message:"User registered successfully",
        success:true,
        data:user
    })
}