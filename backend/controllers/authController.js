import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
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
            return res.status(400).json({
                success: false,
                message: "User already registered",
            });
        }

        const newUser = await User.create({ name, email, phone, password });

        const token = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: newUser,
            token,
        });
    } catch (e) {
        return res.status(500).json({ success: false });
    }
};

export const login = async (req, res) => {
    const { phone, password } = req.body;

    if (!phone || !password) {
        return res.status(400).json({ success: false });
    }

    try {
        const user = await User.findOne({ phone });

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        if (user.password !== password) {
            return res.status(400).json({ success: false, message: "Wrong password" });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user,
            token,
        });
    } catch (e) {
        return res.status(500).json({ success: false });
    }
};

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