import { ErrorHandler } from "../../middleware/errorHandler.js"
import { authRepository } from "./auth.repository.js"
import bcrypt from 'bcrypt'

export const authService={
    register:async(data:{name:string,email:string,password:string})=>{
        const existing=await authRepository.findByEmail(data.email)
        if(existing) throw new ErrorHandler(400,"Email already in use")
        const hashedPassord=await bcrypt.hash(data.password,12)
        const user=await authRepository.create({
            ...data,
            password:hashedPassord
        })
        const { password: _password, ...safeUser } = user;
        return { user: safeUser };
    }
}