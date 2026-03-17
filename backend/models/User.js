import mongoose from "mongoose"

const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    plan: { type: String, enum: ["free", "paid"], default: "free" },
    provider: { type: String, enum: ["local", "google"], default: "local" },
    googleId: { type: String },

}, { timestamps: true });

export default mongoose.model("User", userSchema);
