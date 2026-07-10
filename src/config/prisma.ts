import { PrismaClient } from "../generated/prisma/client.js"
import {env} from "./env.js";
import { PrismaPg } from "@prisma/adapter-pg";


const database_url=env.DATABASE_URL
if (!database_url) {
  throw new Error("DATABASE_URL is not set. Check backend/auth/.env");
}
const adapter = new PrismaPg({ connectionString: database_url });
const prisma = new PrismaClient({adapter})

export default prisma