import express from 'express'
import { loginUser, logout, refreshToken, registerUser } from './auth.controller.js'
import rateLimit from 'express-rate-limit'

const router=express.Router()

const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: {
        success:false,
        message:"Too many login attempts."
    }
});

router.post("/register",authLimiter,registerUser)

router.post("/refresh-token", refreshToken);
router.post("/login",authLimiter,loginUser)
router.post("/logout", logout);


export default router