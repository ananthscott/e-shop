import jwt from "jsonwebtoken";
import User from "./../models/userModel.js";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			token = req.headers.authorization.split(" ")[1];
			const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
			req.user = await User.findById(decodedToken.id).select("-password");
			console.log(req.user);
			next();
		} catch (error) {}
	}

	if (!token) {
		res.status(401);
		throw new Error("Not Authorized - No Token");
	}
});
export { protect };
