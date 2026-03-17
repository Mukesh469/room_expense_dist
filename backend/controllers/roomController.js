import User from "../models/User.js";
import Room from "../models/Room.js";
import Expense from "../models/Expense.js";
import crypto from "crypto";
import { sendInviteMail } from "../service/email/sender.js";

const PLAN_LIMITS = { free: 5, paid: 10 };

export const createRoom = async (req, res) => {
    const userId = req?.userId;
    const { name, desc } = req.body;

    if (!name || !desc) {
        return res.status(400).json({
            success: false,
            message: "Room name and Description are required."
        })
    }

    try {
        const user = await User.findById(userId);
        const existingRoom = await Room.findOne({
            roomCreatedBy: userId,
            roomName: { $regex: `^${name}$`, $options: "i" }
        });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        const allowedRooms = PLAN_LIMITS[user.plan];

        const numberOfRooms = await Room.countDocuments({ roomCreatedBy: userId });

        if (existingRoom) {
            return res.status(409).json({
                success: false,
                message: `A room with the name "${name}" already exists. Please choose another name.`
            });
        }


        if (numberOfRooms >= allowedRooms) {
            return res.status(403).json({
                success: false,
                message: `Your current plan "${user.plan}" allows only ${allowedRooms} rooms. Upgrade to paid plan for more rooms.`,
            });
        }


        const newRoom = await Room.create({
            roomName: name,
            roomDesc: desc,
            roomCreatedBy: userId,
            roomMembers: [
                {
                    memberId: userId,
                    invitedEmail: user.email,
                    status: "accepted",
                    isAdmin: true,
                    invitedAt: new Date(),
                    expiresAt: null
                }
            ]
        });

        await User.findByIdAndUpdate(
            userId,
            {
                $push: {
                    roomsOwned: {
                        roomId: newRoom._id,
                    }
                }
            }
        );

        const roomPayload = {
            _id: newRoom._id,
            roomName: newRoom.roomName,
            roomDesc: newRoom.roomDesc,
            roomCreatedBy: user?.name,
            roomMembers: newRoom.roomMembers,
            roomCreatedAt: newRoom.createdAt
        }

        return res.status(201).json({
            success: true,
            message: "Room created successfully.",
            newRoom: roomPayload
        });
    } catch (e) {
        console.log("Error creating room:", e);
        return res.status(500).json({
            success: false,
            message: "Something went wrong.",
            error: e.message
        });
    }

}

export const addRoomMember = async (req, res) => {
    const userId = req.userId;
    const room = req.room;
    const { phone, email } = req.body;

    if (!phone || !email) {
        return res.status(400).json({
            success: false,
            message: "All fields are required!"
        });
    }

    if (phone.length !== 10) {
        return res.status(400).json({
            success: false,
            message: `Invalid phone number ${phone}`
        });
    }

    try {
        const user = await User.findById(userId);

        if (email === user.email) {
            return res.status(400).json({
                success: false,
                message: "You cannot invite yourself to the room"
            });
        }

        const existingMember = room.roomMembers.find(
            m =>
                m.invitedEmail === email &&
                ["pending", "accepted"].includes(m.status)
        );

        if (existingMember) {
            return res.status(400).json({
                success: false,
                message: `Member already ${existingMember.status} in this room`
            });
        }

        const allowedMembers = PLAN_LIMITS[user.plan];
        if (room.roomMembers.length >= allowedMembers) {
            return res.status(403).json({
                success: false,
                message: `Your plan allows only ${allowedMembers} members.`,
                allowedMembers
            });
        }

        const invitedUser = await User.findOne({ email });

        const inviteToken = crypto.randomBytes(32).toString("hex");

        const invitedAt = new Date();
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

        const newMember = {
            id: invitedUser?._id || null,
            name: invitedUser?.name || null,
            email,
            status: "pending",
            isAdmin: false,
            inviteToken,
            invitedAt,
            expiresAt,
        };

        room.roomMembers.push(newMember);

        await room.save();

        await sendInviteMail({
            to: email,
            roomName: room.roomName,
            token: inviteToken,
            ownerName: user.name
        });

        return res.status(201).json({
            success: true,
            message: `Invitation sent to ${email}.`,
            member: newMember
        });

    } catch (error) {
        console.log("Error in addRoomMember:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const joinRoom = async (req, res) => {
    const { inviteToken, action } = req.query;
    const userId = req.userId;

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "Please register or login to respond to invite"
        });
    }

    if (!["accepted", "rejected"].includes(action)) {
        return res.status(400).json({
            success: false,
            message: "Invalid actions"
        });
    }

    if (!inviteToken) {
        return res.status(400).json({
            success: false,
            message: "InviteToken is missing."
        });
    }

    try {
        const user = await User.findById(userId);
        const room = await Room.findOne({ "roomMembers.inviteToken": inviteToken });

        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid user" });
        }

        if (!room) {
            return res.status(404).json({ success: false, message: "invalid room token" });
        }

        const member = room.roomMembers.find(m => m.inviteToken === inviteToken);

        if (!member) {
            return res.status(404).json({ success: false, message: "Invalid or expired invite" });
        }

        if (user.email !== member.invitedEmail) {
            return res.status(403).json({ success: false, message: "This invite is not meant for your email" });
        }

        if (member.expiresAt && member.expiresAt < new Date()) {
            member.status = "rejected";
            member.inviteToken = undefined;

            await room.save();
            return res.status(410).json({
                success: false,
                message: "Invitation link expired.",
            })
        }

        if (member.status !== "pending") {
            return res.status(404).json({ success: false, message: "Invitation already responded" });
        }

        // CASE 1: invited user was not registered earlier
        if (member.memberId === null) {

            // Email must match invited email
            if (user.email !== member.invitedEmail) {
                return res.status(403).json({
                    success: false,
                    message: "This invitation is not meant for your email"
                });
            }

            // Now assign the newly registered user to this invite
            member.memberId = user._id;
        }
        else {
            // CASE 2: invited user was registered earlier
            if (String(user._id) !== String(member.memberId)) {
                return res.status(403).json({
                    success: false,
                    message: "This invite belongs to another account"
                });
            }
        }

        if (action === "accepted") {
            member.memberId = user._id;
            member.status = "accepted";
        } else {
            member.status = "rejected";
        }

        member.inviteToken = undefined;
        await room.save();

        return res.status(200).json({
            success: true,
            message: `Invitation ${action}`
        });

    } catch (e) {
        console.error(`Error in joinRoom:`, e);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const removeRoomMember = async (req, res) => {
    try {
        const room = req.room;
        const adminId = req.userId;
        const { memberId } = req.params;

        if (adminId === memberId) {
            return res.status(400).json({
                success: false,
                message: "Admin cannot remove himself from the room"
            });
        }

        if (room.roomCreatedBy.toString() === memberId) {
            return res.status(403).json({
                success: false,
                message: "Room owner cannot be removed from the room"
            });
        }

        const member = room.roomMembers.find((m) => m.memberId?.toString() === memberId);

        if (!member) {
            return res.status(404).json({
                success: false,
                message: "Member not found in this room"
            });
        }

        room.roomMembers = room.roomMembers.filter((m) => m.memberId?.toString() !== memberId);

        await room.save();

        return res.status(200).json({
            success: true,
            message: "Member removed successfully"
        });
    } catch (err) {
        console.error("removeMember Error:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

// incomplete contorller hai ahbi ye 
export const getAllRooms = async (req, res) => {
    const userId = req.userId;

    try {
        const rooms = await Room.find({
            $or: [
                { roomCreatedBy: userId },
                { "roomMembers.memberId": userId }
            ]
        })
            .populate("roomCreatedBy", "name email")
            .select("_id roomName roomDesc roomCreatedBy createdAt roomMembers");



        const formatted = rooms.map(room => ({
            _id: room._id,
            roomName: room.roomName,
            roomDesc: room.roomDesc,
            roomCreatedBy: {
                _id: room.roomCreatedBy._id,
                name: `${room.roomCreatedBy.name}`,
                email: `${room.roomCreatedBy.email}`
            },
            createdAt: room.createdAt,
            totalMembers: room.roomMembers.length
        }));

        if (!rooms || rooms.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Don't have any room yet create your first room."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Room fetched successfully",
            rooms: formatted
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const getARoom = async (req, res) => {
    const userId = req.userId;
    const { roomId } = req.params;

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized: User ID missing"
        });
    }

    if (!roomId) {
        return res.status(400).json({
            success: false,
            message: "Room ID is required"
        });
    }

    try {
        const room = await Room.findById(roomId)
            .populate("roomCreatedBy", "name email")
            .populate("roomMembers.memberId", "name email");

        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        const isMember = room.roomMembers.some(
            (member) =>
                member.memberId &&
                member.memberId._id &&
                member.memberId._id.toString() === userId
        );

        const isOwner =
            room.roomCreatedBy &&
            room.roomCreatedBy._id &&
            room.roomCreatedBy._id.toString() === userId;

        if (!isMember && !isOwner) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to access this room"
            });
        }

        const formattedRoom = {
            _id: room._id,
            roomName: room.roomName,
            roomDesc: room.roomDesc,
            roomCreatedBy: room.roomCreatedBy,
            members: room.roomMembers.map(m => ({
                id: m.memberId?._id,
                name: m.memberId?.name,
                email: m.memberId?.email,
                status: m.status,
                isAdmin: m.isAdmin
            })),
            createdAt: room.createdAt
        }

        return res.status(200).json({
            success: true,
            message: "Room fetched successfully",
            room: formattedRoom
        });

    } catch (error) {
        console.error("Error in getARoom:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

export const roomSummary = async (req, res) => {
    const userId = req.userId;
    const { roomId } = req.params;
    const { startDate, endDate } = req.query;

    try {
        const room = await Room.findById(roomId);

        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        const isMember = room.roomMembers.some(
            m => m.memberId?.toString() === userId && m.status === "accepted"
        )
        if (!isMember) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to view this summary"
            });
        }
    } catch (error) {

    }
}
