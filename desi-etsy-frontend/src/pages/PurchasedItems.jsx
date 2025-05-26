import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const PurchasedItems = () => {
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchased = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/orders/purchased", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPurchasedProducts(res.data);
      } catch (error) {
        console.error("Error fetching purchased items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchased();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading purchased items...</p>
      </div>
    );
  }

  if (purchasedProducts.length === 0) {
    return (
      <Container className="mt-5 text-center">
        <h3>No purchased items found.</h3>
        <Button as={Link} to="/products" variant="primary" className="mt-3">
          Shop Now
        </Button>
      </Container>
    );
  }

  return (
    <>
      <Container className="mt-5">
        <h2 className="mb-4">Your Purchased Items</h2>
        <Row>
          {purchasedProducts.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} className="mb-4">
              <Card className="h-100 shadow-sm border-0" style={{ borderRadius: "12px" }}>
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    height: "200px",
                    overflow: "hidden",
                    backgroundColor: "#fff7e6",
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={product.image}
                    alt={product.title}
                    style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                  />
                </div>
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text className="text-success fw-semibold">₹{product.price}</Card.Text>
                  <Button as={Link} to={`/product/${product._id}`} variant="outline-primary">
                    View Product
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default PurchasedItems;
