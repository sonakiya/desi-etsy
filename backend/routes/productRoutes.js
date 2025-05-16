const express = require("express")
const router = express.Router();


const {getAllProducts, createProduct}=require("../controllers/productController")
const authMiddleware=require("../middleware/authMiddleware")

//public route- get All products
router.get("/allproducts",getAllProducts);


//protected route -create product (artisan)
router.post("/create",authMiddleware,createProduct)

module.exports=router;