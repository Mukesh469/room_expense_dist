import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).json({ success: false, message: 'Login required' });
    }
    const token = authToken.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ success: false, message: "Token expired" })
            }

            return res.status(401).json({ success: false, message: "Invalid token" });
        }
        req.userId = decoded.userId
        next()
    })
}

export default verifyToken;