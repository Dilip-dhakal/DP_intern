import { z } from "zod";

export const uploadAttachmentSchema = z.object({
  entityType: z.enum([
    "INCOME",
    "EXPENSE",
    "REMINDER",
  ]),
  entityId: z.uuid(),
});

export const attachmentIdSchema = z.object({
  attachmentId: z.uuid(),
});

export type UploadAttachmentSchema = z.infer<
  typeof uploadAttachmentSchema
>;

export type AttachmentIdSchema = z.infer<
  typeof attachmentIdSchema
>;