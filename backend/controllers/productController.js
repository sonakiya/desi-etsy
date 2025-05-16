const Product = require("../models/products");

//get /api/products-get all products
const getAllProducts = async (req, res) => {
  try {
    //fetch all products from db, sort newest first
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error while fetching products" });
  }
};

//POST /api/products- create new product (artisan only)
const createProduct = async (req, res) => {
  try {
    console.log("req.user:", req.user);
    const { title, description, price, category, image } = req.body;

    //validation (basic)
    if (!title || !description || !price || !category || !image) {
      return res
        .status(400)
        .json({ msg: "Please provide all required fields" });
    }

    //create new product linked to loggedin artisan
    const product = new Product({
      title,
      description,
      price,
      category,
      image: image || "no-image.jpeg",
      artisan: req.user.userId, //from authmiddleware
    });

    await product.save();
    res.status(201).json({ msg: "Product created successfully", product });
  } catch (error) {
    console.warn(error);
    res.status(500).json({ msg: "Server error while creating product",error:error.message });
  }
};

module.exports = { getAllProducts, createProduct };
