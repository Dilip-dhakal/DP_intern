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
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 */
router.post("/register",authLimiter,registerUser)
/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Generate a new access token
 *     tags:
 *       - Authentication
 */
router.post("/refresh-token", refreshToken);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
  $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post("/login",authLimiter,loginUser)
/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 */
router.post("/logout", logout);


export default router