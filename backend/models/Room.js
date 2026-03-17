import mongoose from "mongoose";
const { Schema } = mongoose;

const roomSchema = new Schema({
    roomName: { type: String, required: true },
    roomDesc: { type: String, required: true },
    roomCreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    roomMembers: [
        {
            memberId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
            status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
            invitedEmail: { type: String, required: true },
            isAdmin: { type: Boolean, default: false },
            inviteToken: { type: String },
            invitedAt: { type: Date, default: Date.now },
            expiresAt: { type: Date }
        }
    ]

}, { timestamps: true });

export default mongoose.model("Room", roomSchema);
