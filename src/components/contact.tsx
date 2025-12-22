import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const ContactPage: React.FC = () => {
  return (
    <div style={{ backgroundColor: "#0a0a0f", color: "#fff", minHeight: "80vh", padding: "20px 0"}}>
      <Container>
        <h2 style={{ color: "#ff6835", fontWeight: 700, fontSize: "36px", textAlign: "center", marginBottom: "12px" }}>
          Contact Us
        </h2>
        <p style={{ color: "#aaa", textAlign: "center", fontSize: "16px", marginBottom: "40px" }}>
          Have questions, partnership inquiries, or need support? We'd love to hear from you.
        </p>

        <Row className="g-5">
          <Col xs={12} md={7}>
            <Card style={{ backgroundColor: "#1e1e26", border: "1px solid #333", borderRadius: "12px", padding: "24px" }}>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label style={{ color: "#fff" }}>Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" style={{ backgroundColor: "#2a2a33", color: "#fff", border: "1px solid #444" }} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label style={{ color: "#fff" }}>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" style={{ backgroundColor: "#2a2a33", color: "#fff", border: "1px solid #444" }} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formMessage">
                    <Form.Label style={{ color: "#fff" }}>Message</Form.Label>
                    <Form.Control as="textarea" rows={5} placeholder="How can we help you?" style={{ backgroundColor: "#2a2a33", color: "#fff", border: "1px solid #444" }} />
                  </Form.Group>

                  <Button
                    variant="danger"
                    type="submit"
                    style={{ backgroundColor: "#ff6835", border: "none", fontWeight: "bold", padding: "12px 24px", borderRadius: "6px" }}
                  >
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Contact Info */}
          <Col xs={12} md={5}>
            <div style={{ paddingLeft: "10px" }}>
              <h5 style={{ color: "#ff6835", fontWeight: "bold", marginBottom: "20px" }}>Our Office</h5>
              <p style={{ color: "#ccc", fontSize: "14px", marginBottom: "24px" }}>
                Fitness Club HQ<br />
                Dwarka More, Delhi, India<br />
                ZIP: 110059
              </p>

              <h5 style={{ color: "#ff6835", fontWeight: "bold", marginBottom: "20px" }}>Contact Details</h5>
              <p style={{ color: "#ccc", fontSize: "14px" }}>
                Email: <a href="mailto:support@vibefit.com" style={{ color: "#ff6835" }}>support@fitnessClub.com</a><br />
                Phone: +91 9910935066<br />
                Support Hours: Mon–Fri, 9:00 AM to 6:00 PM IST
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactPage;
