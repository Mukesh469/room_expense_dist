import Room from "../models/Room.js";

const checkRoomAdmin = async (req, res, next) => {
    try {
        const { roomId } = req.params;
        const userId = req.userId;

        if (!roomId) {
            return res.status(400).json({
                success: false,
                message: "Room ID is required"
            })
        }

        const room = await Room.findById(roomId)

        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room not found",
            })
        }

        const member = room.roomMembers.find(
            m => m.memberId?.toString() === userId && m.status === "accepted"
        );

        if (!member) {
            return res.status(403).json({
                success: false,
                message: "You are not a member of this room"
            });
        }

        if (!member.isAdmin) {
            return res.status(403).json({
                success: false,
                message: "Only room admin can perform this action"
            })
        }

        req.room = room;
        req.member = member;
        next();
    } catch (err) {
        console.error("checkRoomAdmin Error:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export default checkRoomAdmin