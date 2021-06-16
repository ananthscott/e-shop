import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import productsRoute from "./routes/productsRoute.js";
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/orderRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
dotenv.config();
connectDb();
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
	console.log(`APi called...`);
});

app.use("/api/products", productsRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);

app.use("/api/config/paypal", (req, res) =>
	res.send(process.env.PAYPAL_CLIENT_ID)
);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV;
app.listen(PORT, console.log(`Server Running...in ${ENV} on ${PORT}`));
