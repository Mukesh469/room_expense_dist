import express from "express"
import verifyToken from "../middleware/verifyToken.js"
import { me } from "../controllers/userController.js";

const router = express.Router()

router.get("/me", verifyToken, me)

export default router;