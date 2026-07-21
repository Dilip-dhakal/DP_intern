import { z } from "zod";

export const createNoteSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(255),
  description: z.string().trim().min(1, "Description is required"),
  colorLabel: z.string().trim().optional(),
});

export const updateNoteSchema = z.object({
  title: z.string().trim().min(1).max(255).optional(),
  description: z.string().trim().min(1).optional(),
  colorLabel: z.string().trim().optional(),
  isPinned: z.boolean().optional(),
  isArchived: z.boolean().optional(),
});

export const noteIdSchema = z.object({
  id: z.uuid(),
});

export const getNoteQuerySchema = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
  search: z.string().optional(),
  is_pinned: z
    .enum(["true", "false"])
    .optional(),
  is_archived: z
    .enum(["true", "false"])
    .optional(),
});
export const toggleNoteSchema = z.object({
    isPinned: z.boolean().optional(),
    isArchived: z.boolean().optional(),
});


export type CreateNoteSchema =z.infer<typeof createNoteSchema>;
export type UpdateNoteSchema =z.infer<typeof updateNoteSchema>;
export type GetNoteQuery =z.infer<typeof getNoteQuerySchema>;
export type NoteIdSchema =z.infer<typeof noteIdSchema>;
export type ToggleNoteSchema = z.infer<typeof toggleNoteSchema>;