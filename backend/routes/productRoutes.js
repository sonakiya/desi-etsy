const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts, // 👈 Make sure this is imported
} = require("../controllers/productController");

const authMiddleware = require("../middleware/authMiddleware");

// Protected routes
router.get("/mine", authMiddleware, getMyProducts); 
router.post("/create", authMiddleware,upload.single("image"), createProduct);
router.put("/update/:id", authMiddleware,upload.single('image'), updateProduct);
router.delete("/delete/:id", authMiddleware, deleteProduct);

// Public routes
router.get("/allproducts", getAllProducts);
router.get("/:id", getProductById); 

module.exports = router;
