import z from "zod";

export const createIncomeCategorySchema = z.object({
    name: z.string().min(1).max(100),
    description: z.string().optional()
});

export const updateIncomeCategorySchema = z.object({
    name: z.string().min(1).max(100).optional(),
    description: z.string().optional()
});

export const incomeCategoryIdSchema = z.object({
    id: z.string().uuid()
});

export const getIncomeCategoryQuerySchema = z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    search: z.string().optional()
});

export type GetIncomeCategoryQuery =
    z.infer<
        typeof getIncomeCategoryQuerySchema
    >;