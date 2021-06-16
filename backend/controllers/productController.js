import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//@desc Fetch all products
//@rout GET /api/products
//@acess public
const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});
	res.json(products);
});

//@desc Fetch Single product By id
//@rout GET /api/products/:id
//@acess public
const getProductById = asyncHandler(async (req, res) => {
	console.log("CALLED CONTROLLER");
	const product = await Product.findById(req.params.id);
	if (product) {
		res.json(product);
	} else {
		res.status(404);
	}
});

export { getProducts, getProductById };
