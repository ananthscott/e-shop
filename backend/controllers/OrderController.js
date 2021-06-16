import asyncHandler from "express-async-handler";
import Order from "./../models/orderModel.js";

//@desc Create New Order
//@rout POST /api/orders
//@acess private
const addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body;

	if (orderItems && orderItems.length === 0) {
		res.status(404);
		throw new Error("No order Items");
	} else {
		const order = new Order({
			orderItems,
			user: req.user._id,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		});
		const createdOrder = await order.save();
		res.status(201).json(createdOrder); //record created in database
	}
});

//@desc GEt order details by id
//@rout GET /api/orders/:id
//@acess private
const getOrderDetails = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate(
		"user",
		"name email"
	);

	if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error("No order found");
	}
});

//@desc update order to paid
//@rout GET /api/orders/:id/pay
//@acess private
const updateOrderToPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isPaid = true;
		order.paidAt = Date.now();
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address,
		};
		const updatedOrder = order.save();

		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error("No order found");
	}
});

//@desc get logged in user orders
//@rout GET /api/orders/myorders
//@acess private
const getMyOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.user._id });

	if (orders) {
		res.json(orders);
	} else {
		res.status(404);
		throw new Error("No orders found");
	}
});

export { addOrderItems, getOrderDetails, updateOrderToPaid, getMyOrders };
