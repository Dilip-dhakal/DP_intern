import { Request, Response } from "express";
import {
  createNoteSchema,
  getNoteQuerySchema,
  noteIdSchema,
  toggleNoteSchema,
  updateNoteSchema,
} from "./note.schema.js";
import { noteService } from "./note.service.js";
import { sendResponse } from "../../utils/response.js";

export const createNote = async (req: Request, res: Response) => {
  const body = createNoteSchema.parse(req.body);
  const userId = req.user?.id;
  const ipAddress = req.headers["x-forwarded-for"] || req.ip;
  const result = await noteService.create(
    body,
    userId as string,
    ipAddress as string,
  );
  return sendResponse(res, 201, "Note created successfully", result);
};

export const getNotes = async (req: Request, res: Response) => {
  const query = getNoteQuerySchema.parse(req.query);
  const result = await noteService.getNotes(query);
  return sendResponse(
    res,
    200,
    "Note fectehd successfully",
    result.data,
    result.metadata,
  );
};

export const getNoteById = async (req: Request, res: Response) => {
  const { id } = noteIdSchema.parse(req.params);
  const result = await noteService.getNoteById(id);
  return sendResponse(res, 200, "Note fetched by Id successfully", result);
};

export const updateNote = async (req: Request, res: Response) => {
  const body = updateNoteSchema.parse(req.body);
  const { id } = noteIdSchema.parse(req.params);
  const userId = req.user?.id;
  const ipAddress = req.headers["x-forwarded-for"] || req.ip;
  const result = await noteService.updateNote(
    id,
    userId as string,
    body,
    ipAddress as string,
  );

  return sendResponse(res, 200, "Note uodated successfully", result);
};

export const deleteNote = async (req: Request, res: Response) => {
  const { id } = noteIdSchema.parse(req.params);
  const userId = req.user?.id;
  const ipAddress = req.headers["x-forwarded-for"] || req.ip;
  const result = await noteService.deleteNote(
    id,
    userId as string,
    ipAddress as string,
  );
  return sendResponse(res, 200, "Note deleted successfully");
};

export const togglePinned = async (req: Request, res: Response) => {
  const { id } = noteIdSchema.parse(req.params);
  const { isPinned } = toggleNoteSchema.parse(req.body);
  const userId = req.user?.id;
  const ipAddress = req.headers["x-forwarded-for"] || req.ip;

  const result = await noteService.togglePinned(
    id,
    isPinned as boolean,
    userId as string,
    ipAddress as string,
  );

  return sendResponse(res, 200, "Pinned status updated successfully", result);
};

export const toggleArchived = async (req: Request, res: Response) => {
  const { id } = noteIdSchema.parse(req.params);
  const { isArchived } = toggleNoteSchema.parse(req.body);
  const userId = req.user?.id;
  const ipAddress = req.headers["x-forwarded-for"] || req.ip
  const result = await noteService.toggleArchived(
    id,
    isArchived as boolean,
    userId as string,
    ipAddress as string,
  );

  return sendResponse(res, 200, "Archive status updated successfully", result);
};
