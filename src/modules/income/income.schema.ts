import z from "zod";


export const createIncomeSchema = z.object({
  transactionDate: z.coerce.date(),
  amount: z
    .number()
    .positive(),
  incomeCategoryId: z.string().uuid(),
  incomeSource: z.string().max(255).optional(),
  clientName: z.string().max(255).optional(),
  paymentMethod: z.enum([
    "CASH",
    "BANK_TRANSFER",
    "CHEQUE",
    "ESEWA",
    "KHALTI",
    "OTHER",
  ]),

  referenceNumber: z.string().max(255).optional(),
  invoiceNumber: z.string().max(255).optional(),
  description: z.string().optional(),
  
});

export const getIncomeQuerySchema = z.object({
  page: z.coerce.number().min(1).optional(),
  limit: z.coerce.number().min(1).max(100).optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  category: z.string().uuid().optional(),
  payment_method: z.string().optional(),
  client_name: z.string().optional(),
  amount_min: z.coerce.number().optional(),
  amount_max: z.coerce.number().optional(),
  search: z.string().optional(),
});

