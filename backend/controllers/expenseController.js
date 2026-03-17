import Room from "../models/Room.js"
import User from "../models/User.js"
import Expense from "../models/Expense.js";

export const addExpense = async (req, res) => {
    const userId = req.userId;
    const { roomId } = req.params;
    const { title, amount, date } = req.body;

    if (!roomId) {
        return res.status(400).json({
            success: false,
            message: "Room id is required"
        })
    }

    if (!title || !amount) {
        return res.status(400).json({
            success: false,
            message: "Title and amount are required"
        })
    }

    try {
        const room = await Room.findById(roomId);

        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            })
        }

        const isMember = room.roomMembers.some(
            m => m.memberId?.toString() === userId && m.status === "accepted"
        )

        if (!isMember) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to add expense in this room"
            })
        }

        const acceptedMembers = room.roomMembers.filter(m => m.status === "accepted");

        const perShare = Number(amount) / acceptedMembers.length;


        const splitList = acceptedMembers.map((m) => ({
            memberId: m.memberId,
            share: perShare,
            paid: m.memberId.toString() === userId
        }));

        const expense = await Expense.create({
            roomId,
            addedBy: userId,
            title,
            amount,
            splitAmong: splitList,
            date: date || new Date()
        })

        return res.status(201).json({
            success: true,
            message: "Expense added successfully",
            expense
        });

    } catch (error) {
        console.log("Error in addExpense:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const getRoomByExpense = async (req, res) => {
    const userId = req.userId;
    const { roomId } = req.params;

    if (!roomId) {
        return res.status(403).json({
            success: false,
            message: "Room id is reqiured."
        });
    }

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
        );

        if (!isMember) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to view expenses of this room"
            });
        }

        const expenses = await Expense.find({ roomId })
            .sort({ date: -1 })
            .populate("addedBy", "name email")
            .populate("splitAmong.memberId", "name email")

        return res.status(200).json({
            success: true,
            message: "Expenses fetched successfully",
            expenses
        });
    } catch (error) {
        console.log(`Error in fetching getExpenseRoomBy`)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}