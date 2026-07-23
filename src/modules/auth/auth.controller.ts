import {Request,Response} from 'express'
import { authService } from './auth.service.js'
import { loginSchema, registerSchema } from './auth.schema.js'
import { sendResponse } from '../../shared/response.js'
import { env } from '../../config/env.js'


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
    const { refreshToken, ...responseData } = result;
    res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, 
});
    return sendResponse(res, 200, "User logged in successfully", responseData)
}

export const refreshToken = async (
  req: Request,
  res: Response
) => {
  const refreshToken = req.cookies.refreshToken;

  const accessToken =
    await authService.refreshToken(refreshToken);

  return sendResponse(
    res,
    200,
    "Access token refreshed successfully",
    {
      accessToken,
    }
  );
};

export const logout = async (
  req: Request,
  res: Response
) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return sendResponse(
    res,
    200,
    "Logged out successfully",
    null
  );
};