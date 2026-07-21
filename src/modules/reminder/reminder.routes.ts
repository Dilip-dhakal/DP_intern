import { Router } from "express";
import { authGuard } from "../../middleware/authGuard.js";
import {createReminder,getReminders,getReminderById,updateReminder,deleteReminder,markReminderCompleted,} from "./reminder.controller.js";

const router = Router();

router.use(authGuard);

router.post("/", createReminder);
router.get("/", getReminders);
router.get("/:id", getReminderById);
router.patch("/:id", updateReminder);
router.delete("/:id", deleteReminder);
router.patch("/:id/complete", markReminderCompleted);

export default router;