import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  desc: { type: String },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  }, // FIXED
  planner: {
    type: [Boolean],
    default: Array(21).fill(false), // 21 days default false
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Habit = mongoose.model("Habit", habitSchema); // Singular name
export default Habit;
