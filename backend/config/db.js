import mongoose from "mongoose";
import dotenv from "dotenv";
const connectDb = async () => {
	try {
		console.log(`Connection Sting : ${process.env.DB_URL}`);

		const conn = await mongoose.connect("mongodb://127.0.0.1:27017/eshop", {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true,
		});
		console.log(`Connected Obj  ${conn.connection.host}`);
	} catch (error) {
		console.log(`Error connecting db ${error.message}`);
		process.exit(1);
	}
};
export default connectDb;
