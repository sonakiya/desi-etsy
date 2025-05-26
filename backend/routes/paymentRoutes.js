const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = Stripe("sk_test_51QmzMLP4zUkcOZhY8hpr7YEwiPbNKRO0eo6ZO3GowpX7a6UkSzwTbv42x8ZT7EnSWNgm4mXQZRRT1BxhclbYhivO00uQxzXxFL"); // 🔑 Your secret key

router.post("/create-checkout-session", async (req, res) => {
  const { product } = req.body;

  console.log("🔹 Received product:", product);

  if (
    !product ||
    typeof product.name !== "string" ||
    !product.name.trim() ||
    !product.price ||
    isNaN(Number(product.price))
  ) {
    return res.status(400).json({ error: "Invalid product data" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: product.name,
              description: product.description || "No description",
            },
            unit_amount: Math.round(Number(product.price) * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `http://localhost:5173/product/${product._id}?payment=success`,
 // 👈 Adjust as per your frontend
      cancel_url: "http://localhost:5500/cancel",
    });

    console.log("✅ Stripe session created:", session.id);
    res.json({ id: session.id });
  } catch (error) {
    console.error("❌ Stripe session error:", error);
    res.status(500).json({ error: "Payment session creation failed" });
  }
});

module.exports = router;
