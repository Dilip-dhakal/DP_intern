import {z} from 'zod'


export const registerSchema=z.object({
    body:z.object({
        name:z.string().min(2,'Length cannot be less than 2 characters'),
        email:z.string().email("Please enter a valid email"),
        password:z.string().min(6,"Password cannot be less than 6 characters")
    })
})