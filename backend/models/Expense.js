import mongoose from "mongoose";

const { Schema } = mongoose;

const expenseSchema = new Schema({
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },

    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    title: { type: String, required: true },

    amount: { type: Number, required: true },

    splitAmong: [
        {
            memberId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            share: { type: Number },    
            paid: { type: Boolean, default: false }
        }
    ],
    date: { type: Date, default: Date.now }
}, {timestamps: true})

export default mongoose.model("Expense", expenseSchema);