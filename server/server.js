import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import habitRoutes from "./routes/habitRoutes.js";

dotenv.config();
const app = express();

// Allow requests from React frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // if you send cookies
  })
);

app.use(express.json());
app.get("/", (req, res) => {
  res.send("API Is Running!!");
});

// Connect DB
connectDB();

// Your routes
app.use("/api/habits", habitRoutes);
app.use("/api/auth", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
