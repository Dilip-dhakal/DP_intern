import {z} from "zod"
import { PaymentMethod } from "../../generated/prisma/index.js"

export const createExpenseSchema=z.object({
    transactionDate:z.coerce.date().max(
        new Date(),
        "Transaction cannot be future dates"
    ),
    amount:z.number().positive(),
    expenseCategoryId:z.string().uuid(),
    vendorName:z.string().optional(),
    paymentMethod:z.enum(PaymentMethod),
    referenceNumber:z.string().max(255).optional(),
    invoiceNumber:z.string().max(255).optional(),
    description:z.string().max(255).optional()
})

export const getExpenseQuerySchema = z.object({
  page: z.coerce.number().min(1).optional(),
  limit: z.coerce.number().min(1).max(100).optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  category: z.string().uuid().optional(),
  payment_method: z.enum([
  "CASH",
  "BANK_TRANSFER",
  "CHEQUE",
  "ESEWA",
  "KHALTI",
  "OTHER"
]).optional(),
  vendor_name: z.string().optional(),
  amount_min: z.coerce.number().optional(),
  amount_max: z.coerce.number().optional(),
  search: z.string().optional(),
});


export const expenseIdSchema=z.object({
    id:z.string().uuid()
})

export const updateExpenseSchema=z.object({
      transactionDate: z.coerce.date().max(
        new Date(),
        "Transaction cannot be in future"
      ).optional(),
      amount: z
        .number()
        .positive()
        .optional(),
      expenseCategoryId: z.string().uuid().optional(),
      clientName: z.string().max(255).optional(),
      paymentMethod: z.enum([
        "CASH",
        "BANK_TRANSFER",
        "CHEQUE",
        "ESEWA",
        "KHALTI",
        "OTHER",
      ]).optional(),
      referenceNumber: z.string().max(255).optional(),
      invoiceNumber: z.string().max(255).optional(),
      description: z.string().optional(),
})

export type GetExpenseQuery=z.infer<typeof getExpenseQuerySchema>