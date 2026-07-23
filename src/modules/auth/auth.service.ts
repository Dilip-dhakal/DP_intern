import  jwt from "jsonwebtoken"
import { ErrorHandler } from "../../middleware/errorHandler.js"
import { authRepository } from "./auth.repository.js"
import bcrypt from 'bcrypt'
import { env } from "../../config/env.js"
import { auditService } from "../../services/audit.services.js"

export const authService={
    register:async(data:{name:string,email:string,password:string})=>{
        if(data===undefined){
            throw new ErrorHandler(400,"Data cant be empty")       }
        const existing=await authRepository.findByEmail(data.email)
        if(existing) throw new ErrorHandler(400,"Email already in use")
        const hashedPassord=await bcrypt.hash(data.password,12)
        const user=await authRepository.create({
            ...data,
            password:hashedPassord
        })
        const { password: _password, ...safeUser } = user;
        return { user: safeUser };
    },

    login:async(email:string,password:string,ipAddress:string)=>{
        const user=await authRepository.findByEmail(email)
        if(!user) throw new ErrorHandler(404,"User with given email doesnt exists")
        const valid=await bcrypt.compare(password,user.password)
        if(!valid) throw new ErrorHandler(401,"Invalid Credentials")
        const accessToken=jwt.sign({id:user.id,email:user.email},env.JWT_ACCESS_SECRET,{
    expiresIn:"15m"})
    const refreshToken = jwt.sign(
  {
    id: user.id,
    email: user.email,
  },
  env.JWT_REFRESH_SECRET,
  {
    expiresIn: "7d",
  }
);
    const { password: _password, ...safeUser } = user;
    await auditService.log(
        user.id,
        "LOGIN",
        "AUTH",
        user.id,
        null,
        user,
        ipAddress
    )
    return { user: safeUser, accessToken,refreshToken };
    },
    refreshToken: async (refreshToken: string) => {
  if (!refreshToken) {
    throw new ErrorHandler(
      401,
      "Refresh token is required"
    );
  }

  let payload: jwt.JwtPayload;

  try {
    payload = jwt.verify(
      refreshToken,
      env.JWT_REFRESH_SECRET
    ) as jwt.JwtPayload;
  } catch {
    throw new ErrorHandler(
      401,
      "Invalid or expired refresh token"
    );
  }

  const user = await authRepository.findById(payload.id);

  if (!user) {
    throw new ErrorHandler(
      404,
      "User not found"
    );
  }

  const accessToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    env.JWT_ACCESS_SECRET,
    {
      expiresIn: "15m",
    }
  );

  return accessToken;
},
}