import { Prisma, AuditAction } from "../../generated/prisma/index.js";
import { ErrorHandler } from "../../middleware/errorHandler.js";
import { auditService } from "../../services/audit.services.js";
import { pagination } from "../../utils/pagination.js";
import { attachmentRepository } from "../attachments/attachment.repository.js";
import { reminderRepository } from "./reminder.repository.js";
import { CreateReminderRequest, UpdateReminderData } from "./reminder.type.js";
import { GetReminderQuery } from "./reminder.schema.js";

export const reminderService = {
  create: async (data: CreateReminderRequest,userId: string,ipAddress: string,) => {
    const reminder = await reminderRepository.create({
      ...data,
      createdById: userId,
    });

    await auditService.log(
      userId,
      AuditAction.CREATE,
      "REMINDER",
      reminder.id,
      null,
      reminder,
      ipAddress,
    );

    return reminder;
  },

  getReminders: async (query: GetReminderQuery) => {
    const { page, limit, skip } = pagination(query);
    const where: Prisma.ReminderWhereInput = {
      deletedAt: null,
    };

    if (query.status) {
      where.status = query.status;
    }

    if (query.priority) {
      where.priority = query.priority;
    }

    if (query.search) {
      where.OR = [
        {
          title: {
            contains: query.search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: query.search,
            mode: "insensitive",
          },
        },
      ];
    }

    if (query.from && query.to) {
      where.reminderDate = {
        gte: new Date(query.from),
        lte: new Date(query.to),
      };
    }

    const reminders = await reminderRepository.findMany(where, skip, limit);
    const total = await reminderRepository.count(where);

    return {
      data: reminders,
      metadata: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  getReminderById: async (id: string) => {
    const reminder = await reminderRepository.findById(id);
    if (!reminder) {
      throw new ErrorHandler(404, "Reminder not found");
    }
    const attachments = await attachmentRepository.findMany("REMINDER", id);

    return {
      ...reminder,
      attachments,
    };
  },

  updateReminder: async (id: string,userId: string,data: UpdateReminderData,ipAddress: string,) => {
    const reminder = await reminderRepository.findById(id);
    if (!reminder) {
      throw new ErrorHandler(404, "Reminder not found");
    }
    const updated = await reminderRepository.update(id, data);
    await auditService.log(
      userId,
      AuditAction.UPDATE,
      "REMINDER",
      id,
      reminder,
      updated,
      ipAddress,
    );

    return updated;
  },

  deleteReminder: async (id: string, userId: string, ipAddress: string) => {
    const reminder = await reminderRepository.findById(id);
    if (!reminder) {
      throw new ErrorHandler(404, "Reminder not found");
    }
    const deleted = await reminderRepository.softDelete(id, userId);

    await auditService.log(
      userId,
      AuditAction.DELETE,
      "REMINDER",
      id,
      reminder,
      null,
      ipAddress,
    );

    return deleted;
  },

  markCompleted: async (id: string, userId: string, ipAddress: string) => {
    const reminder = await reminderRepository.findById(id);
    if (!reminder) {
      throw new ErrorHandler(404, "Reminder not found");
    }
    const updated = await reminderRepository.update(id, {
      status: "COMPLETED",
    });

    await auditService.log(
      userId,
      AuditAction.UPDATE,
      "REMINDER",
      id,
      reminder,
      updated,
      ipAddress,
    );

    return updated;
  },
};
