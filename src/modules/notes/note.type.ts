import { CreateNoteSchema, UpdateNoteSchema } from "./note.schema.js";

export type CreateNoteRequest = CreateNoteSchema;

export interface CreateNoteData extends CreateNoteRequest {
  createdById: string;
}

export interface UpdateNoteData extends UpdateNoteSchema {}
