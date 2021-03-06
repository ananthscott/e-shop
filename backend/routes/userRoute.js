import express from "express";

import {
	authUser,
	userProfile,
	registerUser,
	updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);
//implementing middleware
router
	.route("/profile")
	.get(protect, userProfile)
	.put(protect, updateUserProfile);

export default router;
