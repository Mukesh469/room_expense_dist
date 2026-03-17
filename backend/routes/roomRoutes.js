import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import checkRoomAdmin from "../middleware/checkRoomAdmin.js";
import { addRoomMember, createRoom, joinRoom, removeRoomMember, getAllRooms, roomSummary, getARoom } from "../controllers/roomController.js";

const router = express.Router();


router.post("/create", verifyToken, createRoom);
router.post("/:roomId/addmember", verifyToken, checkRoomAdmin, addRoomMember);

router.get("/", verifyToken, getAllRooms);
router.get("/:roomId", verifyToken, getARoom);
router.get("/:roomId/summary", verifyToken, roomSummary);

router.delete("/:roomId/remove-member/:memberId", verifyToken, checkRoomAdmin, removeRoomMember);

router.patch("/invite", verifyToken, joinRoom);

export default router;