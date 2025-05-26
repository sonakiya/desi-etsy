import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);


import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Spinner,
  Badge,
} from "react-bootstrap";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // ✅ Show payment success toast if redirected after payment
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const paymentStatus = query.get("payment");

    if (paymentStatus === "success") {
      toast.success("🎉 Payment Successful!");
      navigate(`/product/${id}`, { replace: true }); // clean URL
    }
  }, [location.search, navigate, id]);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success("Product added to cart!");
    navigate("/cart");
  };

  const handleBuyNow = async () => {
    try {
      const res = await fetch("http://localhost:5500/api/payment/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: {
            name: product.title,
            description: product.description,
            price: product.price,
            _id: product._id, // ensure _id is sent to backend for redirect
          },
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create checkout session");
      }

      const data = await res.json();
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.id });
    } catch (err) {
      console.error("❌ Payment error:", err);
      toast.error("Payment initialization failed: " + err.message);
    }
  };

  const renderStars = (rating = 4.5) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    return (
      <>
        {Array(full)
          .fill()
          .map((_, i) => (
            <FaStar key={i} className="text-warning" />
          ))}
        {half && <FaStarHalfAlt className="text-warning" />}
        {Array(empty)
          .fill()
          .map((_, i) => (
            <FaRegStar key={i} className="text-warning" />
          ))}
        <span className="ms-2">({rating})</span>
      </>
    );
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading...</p>
      </div>
    );
  }

  if (!product) {
    return <p className="text-center mt-5">Product not found.</p>;
  }

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col md={6}>
            <Image src={product.image} fluid rounded />
            <div className="mt-3">
              <h6>Tags:</h6>
              <Badge bg="secondary" className="me-2">
                Handmade
              </Badge>
              <Badge bg="info" className="me-2">
                Eco-friendly
              </Badge>
              <Badge bg="dark">Popular</Badge>
            </div>
          </Col>
          <Col md={6}>
            <h2>{product.title}</h2>
            <div className="mb-2">{renderStars(product.rating)}</div>
            <p>
              <strong>Price:</strong> ₹{product.price}
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Availability:</strong> In Stock
            </p>
            <p>
              <strong>Estimated Delivery:</strong> 3-5 business days
            </p>
            <p>
              <strong>Return Policy:</strong> 7-day easy return
            </p>
            <p>
              <strong>Description:</strong>
              <br />
              {product.description}
            </p>
            <p>
              <strong>Material:</strong> 100% Desi Product
            </p>
            <div className="d-flex gap-3 mt-4">
              <Button variant="success" onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Button variant="primary" onClick={handleBuyNow}>
                Buy Now
              </Button>
            </div>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <h4>Customer Reviews</h4>
            <hr />
            <p>
              <strong>Aarav M.</strong>: 🌟🌟🌟🌟🌟<br />
              “Great quality and fast delivery. Highly recommend!”
            </p>
            <p>
              <strong>Sneha R.</strong>: 🌟🌟🌟🌟<br />
              “Exactly as shown in the picture. Loved the packaging too.”
            </p>
            <p>
              <strong>Rahul K.</strong>: 🌟🌟🌟<br />
              “Decent product but delivery was a bit late.”
            </p>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default ProductDetails;
