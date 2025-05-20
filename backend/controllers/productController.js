const Product = require("../models/products");

// GET /api/products - Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error while fetching products" });
  }
};

// GET /api/products/:id - Get single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching product", error: error.message });
  }
};

// GET /api/products/mine - Get artisan's products
const getMyProducts = async (req, res) => {
  try {
    const myProducts = await Product.find({ artisan: req.user.userId }).sort({ createdAt: -1 });
    res.json(myProducts); // 👈 Return pure array
  } catch (error) {
    res.status(500).json({ msg: "Error fetching your products", error: error.message });
  }
};

// POST /api/products - Create product
const createProduct = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;
    const image = req.file?.path; // Cloudinary URL

    if (!title || !description || !price || !category || !image) {
      return res.status(400).json({ msg: "Please provide all required fields" });
    }

    const product = new Product({
      title,
      description,
      price,
      category,
      image,
      artisan: req.user.userId,
    });

    await product.save();
    res.status(201).json({ msg: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ msg: "Server error while creating product", error: error.message });
  }
};

// PUT /api/products/:id - Update product
const updateProduct = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;
    const image = req.file?.path; // If a new image is uploaded

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    if (product.artisan.toString() !== req.user.userId) {
      return res.status(403).json({ msg: "You are not allowed to update this product" });
    }

    product.title = title || product.title;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;

    // Update image only if a new image is uploaded
    if (image) {
      product.image = image;
    }

    await product.save();
    res.json({ msg: "Product updated", product });
  } catch (error) {
    res.status(500).json({ msg: "Error updating product", error: error.message });
  }
};


// DELETE /api/products/:id - Delete product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    if (product.artisan.toString() !== req.user.userId) {
      return res.status(403).json({ msg: "You are not allowed to delete this product" });
    }

    await product.deleteOne();
    res.json({ msg: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting product", error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getMyProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
