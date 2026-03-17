import express from "express"
import { addExpense, getRoomByExpense } from "../controllers/expenseController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/:roomId/add", verifyToken, addExpense);
router.get("/room/:roomId", verifyToken, getRoomByExpense)

export default router;