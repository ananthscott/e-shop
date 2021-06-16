import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDb from "./config/db.js";
import color from "colors";

connectDb();

const importData = async () => {
	try {
		await Order.deleteMany();
		await User.deleteMany();
		await Product.deleteMany();

		const createdUsers = await User.insertMany(users);
		const adminUser = createdUsers[0];

		const sampleProducts = products.map((product) => ({
			...product,
			user: adminUser,
		}));
		await Product.insertMany(sampleProducts);
		console.log(`DATA INSETED`.green.inverse);
		process.exit();
	} catch (error) {
		console.error(`${error}`.red.inverse);
		process.exit(1);
	}
};

const destroyData = async () => {
	try {
		await Order.deleteMany();
		await User.deleteMany();
		await Product.deleteMany();

		console.log(`DATA DESTROYED`.red.inverse);
		process.exit();
	} catch (error) {
		console.error(`${error}`.red.inverse);
		process.exit(1);
	}
};

if (process.argv[2] === "-d") {
	destroyData();
} else {
	importData();
}
