import { CreateReminderSchema,UpdateReminderSchema } from "./reminder.schema.js";

export type CreateReminderRequest=CreateReminderSchema

export interface CreateReminderData extends CreateReminderRequest{
    createdById:string
}

export interface UpdateReminderData extends UpdateReminderSchema{}