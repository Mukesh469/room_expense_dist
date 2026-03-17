import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";

import connectDB from "./db.js";

dotenv.config()
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('\n:method :url :status :res[content-length] - :response-time ms \n'))

app.use(cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
}));

connectDB()

app.use("/api/auth", authRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/user", userRoutes);
app.use("/api/expense", expenseRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to the room_expense_dist app")
});

app.listen(PORT, () => {
    console.log(`app is running on http://localhost:${PORT}`);
});