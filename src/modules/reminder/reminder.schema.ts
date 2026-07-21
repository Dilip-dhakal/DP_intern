import {z} from 'zod'

export const createReminderSchema = z.object({
  title: z.string().trim().min(1).max(255),
  description: z.string().optional(),
  reminderDate: z.coerce.date(),
  reminderTime: z.string().optional(),
  priority: z.enum([
    "LOW",
    "MEDIUM",
    "HIGH"
  ]),

  repeat: z
    .enum([
      "NONE",
      "DAILY",
      "WEEKLY",
      "MONTHLY",
      "YEARLY",
    ])
    .default("NONE"),
});

export const updateReminderSchema =
  createReminderSchema.partial().extend({
    status: z
      .enum([
        "PENDING",
        "COMPLETED",
      ])
      .optional(),
  });

export const reminderIdSchema = z.object({
  id: z.uuid(),
});

export const getReminderQuerySchema =z.object({
    page:z.coerce.number().default(1),
    limit:z.coerce.number().default(10),
    search:z.string().optional(),
    status:z
      .enum([
        "PENDING",
        "COMPLETED",
      ])
      .optional(),

    priority:z
      .enum([
        "LOW",
        "MEDIUM",
        "HIGH",
      ])
      .optional(),

    from:z.string().optional(),
    to:z.string().optional(),
});

export type CreateReminderSchema =z.infer<typeof createReminderSchema>;
export type UpdateReminderSchema =z.infer<typeof updateReminderSchema>;
export type GetReminderQuery =z.infer<typeof getReminderQuerySchema>;