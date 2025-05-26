import React from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import Footer from "../components/Footer";

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Buy All button ka handler (aap yahan checkout logic daal sakte ho)
  const handleBuyAll = () => {
    alert(`Proceeding to buy all items totaling ₹${total.toFixed(2)}`);
    // Yahan navigate kar sakte ho checkout page pe, ya payment modal dikha sakte ho
    // example: navigate('/checkout');
  };

  return (
    <>
    <Container className="mt-4">
      <h2 className="mb-4 text-center">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center fs-5">Your Cart is Empty.</p>
      ) : (
        <>
          <Row>
            {cartItems.map((item, idx) => (
              <Col md={6} lg={4} key={idx} className="mb-4">
                <Card
                  className="h-100 shadow-lg"
                  style={{ borderRadius: "15px", transition: "transform 0.2s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <Card.Img
                    variant="top"
                    src={item.image}
                    alt={item.name}
                    style={{ height: '200px', objectFit: 'contain', padding: '15px', backgroundColor: "#fff7e6", borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fw-bold">{item.name}</Card.Title>
                    <Card.Text className="fs-5 text-success fw-semibold">₹{item.price}</Card.Text>
                    <Card.Text className="text-muted flex-grow-1">{item.description}</Card.Text>

                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Quantity:</Form.Label>
                      <Form.Control
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item._id, Math.max(1, parseInt(e.target.value)))}
                        style={{ maxWidth: "80px" }}
                      />
                    </Form.Group>

                    {/* Remove button */}
                    <div className="d-flex justify-content-start mt-auto">
                      <Button variant="warning" onClick={() => removeFromCart(item)} className="fw-semibold">
                        Remove
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Total amount */}
          <h4 className="text-end mt-3 fw-bold">Total: ₹{total.toFixed(2)}</h4>

          {/* Buy All button */}
          <div className="d-flex justify-content-end mt-3 mb-3">
            <Button variant="warning" size="lg" onClick={handleBuyAll}>
              Buy All Items
            </Button>
          </div>
        </>
      )}

    </Container>
    <Footer/>
    </>
  );
};

export default CartPage;
