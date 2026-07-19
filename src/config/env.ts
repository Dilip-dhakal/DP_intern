import z from "zod";
import dotenv from "dotenv"


dotenv.config()
const envSchema = z.object({
  PORT: z.coerce.number().default(8000),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
  CLOUDINARY_CLOUD_NAME:z.string().min(1,"Cloudinary cloud name is required"),
  CLOUDINARY_API_KEY:z.string().min(1,"Cloudinary API KEY is required"),
  CLOUDINARY_API_SECRET:z.string().min(1,"Cloudinary api secret is required")

  
  
});

const _env = envSchema.safeParse(process.env);
if (!_env.success) {
  console.error("Invalid environment variables:", _env.error.format());
  process.exit(1);
}

export const env = _env.data;