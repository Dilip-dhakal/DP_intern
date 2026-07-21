import { Request,Response,NextFunction, RequestHandler } from "express";
import { ErrorHandler } from "./errorHandler.js";
import jwt,{JsonWebTokenError,TokenExpiredError} from 'jsonwebtoken'
import { env } from "../config/env.js";
import { JwtUserPayload } from "../types/jwtPayload.js";

export const authGuard:RequestHandler=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const authHeader=req.headers.authorization
    if(!authHeader){
        throw new ErrorHandler(401,"Authentication token missing")
    }
    if(!authHeader.startsWith("Bearer ")){
        throw new ErrorHandler(401,"Invalid authentication format")
    }
    const token=authHeader.split(" ")[1]
    const decoded=jwt.verify(token,env.JWT_SECRET)
    if(!decoded){
        throw new ErrorHandler(400,"Invalid token")
    }
    req.user=decoded as JwtUserPayload

    next()
    } catch (error:any) {
        if (error.name === "TokenExpiredError") {
    return next(
      new ErrorHandler(
        401,
        "Access token has expired. Please login again."
      )
    );
  }

  if (error.name === "JsonWebTokenError") {
    return next(
      new ErrorHandler(
        401,
        "Invalid access token."
      )
    );
  }


    next(error);
    }
    
}