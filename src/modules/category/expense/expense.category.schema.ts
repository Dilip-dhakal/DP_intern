import z from "zod";

export const createExpenseCategorySchema = z.object({
  name: z.string().min(2).max(50),

  description: z.string().optional(),
});

export const updateExpenseCategorySchema = z.object({
  name: z.string().min(2).max(50).optional(),

  description: z.string().optional(),
});

export const expenseCategoryIdSchema = z.object({
  id: z.uuid(),
});

export const getExpenseCategoryQuerySchema= z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional()
});

export type GetExpenseCategoryQuerySchema =
    z.infer<
        typeof getExpenseCategoryQuerySchema
    >;