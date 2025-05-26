const express = require("express");
const connectDB = require("./config/db");

const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

//Mount auth routes under /api/auth
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth",authRoutes)


const productRoutes = require("./routes/productRoutes")
app.use("/api/products",productRoutes) 

// Add this route import
const paymentRoutes = require('./routes/paymentRoutes');
app.use('/api/payment', paymentRoutes);






// ✅ Sample route
app.get("/", (req, res) => {
  res.send("Desi Etsy API is running ✅");
});

// Start server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`🚀 Server running on PORT ${PORT}`);
});
