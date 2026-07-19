import { z } from "zod";

export const uploadAttachmentParamsSchema = z.object({
    id: z.uuid()
});

export const attachmentIdSchema = z.object({
    id: z.uuid()
});

export type UploadAttachmentParams =
    z.infer<typeof uploadAttachmentParamsSchema>;

export type AttachmentIdParams =
    z.infer<typeof attachmentIdSchema>;