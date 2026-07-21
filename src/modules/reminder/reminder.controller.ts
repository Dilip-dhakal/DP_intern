import { Request, Response } from "express";
import {createReminderSchema,updateReminderSchema,reminderIdSchema,getReminderQuerySchema,} from "./reminder.schema.js";
import { reminderService } from "./reminder.service.js";
import { sendResponse } from "../../utils/response.js";

export const createReminder = async (req: Request, res: Response) => {
  const body = createReminderSchema.parse(req.body);
  const userId = req.user?.id;
  const ipAddress = req.headers["x-forwarded-for"] || req.ip;

  const result = await reminderService.create(
    body,
    userId as string,
    ipAddress as string,
  );

  return sendResponse(res, 201, "Reminder created successfully", result);
};

export const getReminders = async (req: Request, res: Response) => {
  const query = getReminderQuerySchema.parse(req.query);
  const result = await reminderService.getReminders(query);
  return sendResponse(
    res,
    200,
    "Reminders fetched successfully",
    result.data,
    result.metadata,
  );
};

export const getReminderById = async (req: Request, res: Response) => {
  const { id } = reminderIdSchema.parse(req.params);
  const result = await reminderService.getReminderById(id);
  return sendResponse(res, 200, "Reminder fetched successfully", result);
};

export const updateReminder = async (req: Request, res: Response) => {
  const body = updateReminderSchema.parse(req.body);
  const { id } = reminderIdSchema.parse(req.params);
  const userId = req.user?.id;
  const ipAddress = req.headers["x-forwarded-for"] || req.ip;
  const result = await reminderService.updateReminder(
    id,
    userId as string,
    body,
    ipAddress as string,
  );

  return sendResponse(res, 200, "Reminder updated successfully", result);
};

export const deleteReminder = async (req: Request, res: Response) => {
  const { id } = reminderIdSchema.parse(req.params);
  const userId = req.user?.id;
  const ipAddress = req.headers["x-forwarded-for"] || req.ip;
  const result=await reminderService.deleteReminder(
    id,
    userId as string,
    ipAddress as string,
  );

  return sendResponse(res, 200, "Reminder deleted successfully");
};

export const markReminderCompleted = async (req: Request, res: Response) => {
  const { id } = reminderIdSchema.parse(req.params);
  const userId = req.user?.id;
  const ipAddress = req.headers["x-forwarded-for"] || req.ip;
  const result = await reminderService.markCompleted(
    id,
    userId as string,
    ipAddress as string,
  );

  return sendResponse(res, 200, "Reminder marked completed", result);
};
