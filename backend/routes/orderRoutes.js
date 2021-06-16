import express from "express";
import {
	addOrderItems,
	getMyOrders,
	getOrderDetails,
	updateOrderToPaid,
} from "../controllers/OrderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, addOrderItems);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderDetails);
router.route("/:id/pay").put(protect, updateOrderToPaid);

export default router;
