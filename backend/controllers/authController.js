import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            success: false,
            message: "body is required."
        });
    }
    const { name, email, phone, password, confirmPassword } = req.body;


    if (!name || !email || !password || !confirmPassword || !phone) {
        return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    if (password.trim() !== confirmPassword.trim()) {
        return res.status(400).json({ success: false, message: "Password mismatched!" });
    }

    try {
        const doesExists = await User.findOne({ $or: [{ phone }, { email }] });

        if (doesExists) {
            return res.status(400).json({ success: false, message: "User already registered.with this email or phone" })
        }
        const newUser = await User.create({ name, email, phone, password });

        const token = jwt.sign({ userId: newUser._id}, process.env.JWT_SECRET, { expiresIn: "1d" });

        const newUserPayload = {
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
            plan: newUser.plan,
            roomsOwned: newUser.roomsOwned,
            createdAt: newUser.createdAt
        }
        return res.status(201).json({ success: true, message: "User registered successfully", newUserPayload, token });
    } catch (e) {
        console.error(`error in registering`, e);
        return res.status(500).json({ success: false, message: "Internal Server Error." });
    }

}

export const login = async (req, res) => {
    const { phone, password } = req.body;

    if (!phone || !password) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    try {
        const existsUser = await User.findOne({ phone });
        if (!existsUser) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        const matchPasword = existsUser.password.trim() === password.trim()

        if (!matchPasword) {
            return res.status(400).json({ sucess: false, message: "Wrong password! Please try again" });
        }

        const token = jwt.sign({ userId: existsUser._id, role: existsUser.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

        return res.status(200).json({ success: true, message: "Login successfully", token });
    } catch (e) {
        console.error(`login error: `, e);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// export const googleLogin = async (req, res) => {
//     const { gooleLoginToken } = req.body;

//     if (!gooleLoginToken) {
//         return res.status(400).json({
//             success: false,
//             message: "Google token is required"
//         });
//     }

//     try {
//         const
//     }
// }