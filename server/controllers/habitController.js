import Habit from "../models/Habit.js";

export const getHabits = async (req, res) => {
  const habits = await Habit.find({ user: req.user._id });
  res.json(habits);
};

// Add a new todo
export const addHabit = async (req, res) => {
  const habit = new Habit({ ...req.body, user: req.user._id });
  await habit.save();
  res.json(habit);
};

// Existing getHabits, addHabit, deleteHabit here...

// New: Get single habit by ID
export const getHabitById = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) return res.status(404).json({ message: "Habit not found" });

    // Ensure habit belongs to current user
    if (habit.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.json(habit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update habit: toggle days OR edit title/desc
export const toggleDays = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) return res.status(404).json({ message: "Habit not found" });

    if (habit.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Toggle a day if `id` provided
    if (typeof req.body.id === "number") {
      const dayIndex = req.body.id;
      habit.planner[dayIndex] = !habit.planner[dayIndex];
    }

    // Update title/desc if provided
    if (req.body.title) habit.title = req.body.title;
    if (req.body.desc) habit.desc = req.body.desc;

    await habit.save();
    res.json(habit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Delete todo
export const deleteHabit = async (req, res) => {
  const habit = await Habit.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!habit) return res.status(404).json({ message: "Todo not found" });

  res.json({ message: "Deleted" });
};
