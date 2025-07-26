import express from "express";
import {
  getHabits,
  addHabit,
  toggleDays,
  getHabitById,
  deleteHabit,
} from "../controllers/habitController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getHabits);
router.post("/", protect, addHabit);
router.get("/:id", protect, getHabitById);
router.patch("/:id", protect, toggleDays);
router.delete("/:id", protect, deleteHabit);

export default router;
