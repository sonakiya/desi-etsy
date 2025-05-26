import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Spinner, Button, Navbar, Nav } from "react-bootstrap";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const categories = ["All", "Home Decor", "Clothing", "Accessories", "Paintings", "Others"];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Products laane me error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const renderStars = (rating = 4) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {Array(fullStars).fill().map((_, i) => <FaStar key={"full" + i} className="text-warning" />)}
        {halfStar && <FaStarHalfAlt className="text-warning" />}
        {Array(emptyStars).fill().map((_, i) => <FaRegStar key={"empty" + i} className="text-warning" />)}
      </>
    );
  };

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      {/* Navbar with Purchased Items button */}
      <Navbar bg="light" expand="lg" className="shadow-sm mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
            Desi<span style={{color:"orange"}}>Etsy</span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Button
                as={Link}
                to="/purchased"
                variant="outline-success"
                className="me-2"
              >
                ✅ Purchased Items
              </Button>
              <Button as={Link} to="/cart" variant="outline-primary" className="me-2">
                🛒 View Cart
              </Button>
              <Button onClick={handleLogout} variant="outline-danger">
                🔓 Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Category buttons */}
      <Container>
        <div className="mb-4 text-center">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "warning" : "outline-warning"}
              className="me-2 mb-2"
              onClick={() => setSelectedCategory(cat)}
              style={{ fontWeight: selectedCategory === cat ? "600" : "400" }}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <Row>
          {filteredProducts.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} className="mb-4">
              <Card
                className="h-100 shadow-sm border-0 product-card"
                style={{
                  borderRadius: "12px",
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                {/* Image container */}
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
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>

                {/* Card body */}
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold">{product.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted fst-italic">
                    {product.category}
                  </Card.Subtitle>
                  <Card.Text
                    style={{
                      height: "60px",
                      overflow: "hidden",
                      marginBottom: "8px",
                      color: "#555",
                    }}
                  >
                    {product.description}
                  </Card.Text>

                  <Card.Text className="mb-2 fs-5 text-success fw-semibold">
                    ₹{product.price}
                  </Card.Text>

                  <div className="mb-3">{renderStars(product.rating)}</div>

                  <Button
                    as={Link}
                    to={`/product/${product._id}`}
                    variant="warning"
                    className="mt-auto fw-bold"
                    style={{ boxShadow: "0 4px 8px rgba(255, 165, 0, 0.4)" }}
                  >
                    Buy Now
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

export default Products;
