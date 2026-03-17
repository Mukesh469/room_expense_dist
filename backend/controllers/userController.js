import User from "../models/User.js"

export const me = async (req, res) => {
    const userId = req.userId;
    if (!userId) {
        return res.status(400).json({
            success: false,
            message: `user id is required`
        });
    }

    try {
        const user = await User.findById(userId).select("-password -__v");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `user not found with this user id: ${userId} `
            }) 
        }

        return res.status(200).json({
            success: true,
            message: `User profile fetched successfully`,
            user
        });
    } catch (err) {
        console.log("Error in /me:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}