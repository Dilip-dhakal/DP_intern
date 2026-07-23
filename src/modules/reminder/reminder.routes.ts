import { Router } from "express";
import { authGuard } from "../../middleware/authGuard.js";
import {
  createReminder,
  getReminders,
  getReminderById,
  updateReminder,
  deleteReminder,
  markReminderCompleted,
} from "./reminder.controller.js";

const router = Router();

router.use(authGuard);

/**
 * @swagger
 * /reminder:
 *   post:
 *     summary: Create a new reminder
 *     tags:
 *       - Reminder
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateReminderRequest'
 *     responses:
 *       201:
 *         description: Reminder created successfully
 */
router.post("/", createReminder);

/**
 * @swagger
 * /reminder:
 *   get:
 *     summary: Get all reminders
 *     tags:
 *       - Reminder
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Reminders fetched successfully
 */
router.get("/", getReminders);

/**
 * @swagger
 * /reminder/{id}:
 *   get:
 *     summary: Get reminder by ID
 *     tags:
 *       - Reminder
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Reminder fetched successfully
 *       404:
 *         description: Reminder not found
 */
router.get("/:id", getReminderById);

/**
 * @swagger
 * /reminder/{id}:
 *   patch:
 *     summary: Update reminder
 *     tags:
 *       - Reminder
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateReminderRequest'
 *     responses:
 *       200:
 *         description: Reminder updated successfully
 */
router.patch("/:id", updateReminder);

/**
 * @swagger
 * /reminder/{id}:
 *   delete:
 *     summary: Delete reminder
 *     tags:
 *       - Reminder
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Reminder deleted successfully
 */
router.delete("/:id", deleteReminder);

/**
 * @swagger
 * /reminder/{id}/complete:
 *   patch:
 *     summary: Mark reminder as completed
 *     tags:
 *       - Reminder
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Reminder marked as completed
 */
router.patch("/:id/complete", markReminderCompleted);

export default router;