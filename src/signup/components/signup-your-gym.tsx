import React, { useState, ChangeEvent, FormEvent } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { GymFormData } from "../types";



export const SignUpYourGym: React.FC = () => {
  const [form, setForm] = useState<GymFormData>({
    ownerName: "",
    gymName: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    gymLogo: null,
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm({ ...form, gymLogo: file });

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Gym Registration Data:", form);
    // form.gymLogo contains the uploaded file
    alert("🎉 Gym Registered Successfully!");
  };

  return (
    <div
      style={{
        backgroundColor: "#0a0a0f",
        color: "#fff",
        minHeight: "80vh",
        alignItems: "center",
        justifyContent: "center",
        padding: "5px 0 60px",
      }}
    >
      <Container style={{ maxWidth: "800px" }}>
        <h2
          style={{
            color: "#ff6835",
            fontWeight: 700,
            fontSize: "36px",
            textAlign: "center",
            marginBottom: "12px",
          }}
        >
          Register Your Gym
        </h2>
        <p
          style={{
            color: "#aaa",
            textAlign: "center",
            fontSize: "16px",
            marginBottom: "40px",
          }}
        >
          Join the fitness revolution — create your gym profile to attract members and grow your business.
        </p>

      
            <Card
              style={{
                backgroundColor: "#1e1e26",
                border: "1px solid #333",
                borderRadius: "12px",
                padding: "24px",
              }}
            >
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: "#fff" }}>Owner Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter owner's full name"
                      name="ownerName"
                      value={form.ownerName}
                      onChange={handleChange}
                      style={{ backgroundColor: "#2a2a33", color: "#fff", border: "1px solid #444" }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: "#fff" }}>Gym Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter gym name"
                      name="gymName"
                      value={form.gymName}
                      onChange={handleChange}
                      style={{ backgroundColor: "#2a2a33", color: "#fff", border: "1px solid #444" }}
                    />
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ color: "#fff" }}>Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          style={{ backgroundColor: "#2a2a33", color: "#fff", border: "1px solid #444" }}
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ color: "#fff" }}>Phone</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter phone number"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          style={{ backgroundColor: "#2a2a33", color: "#fff", border: "1px solid #444" }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: "#fff" }}>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Create a password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      style={{ backgroundColor: "#2a2a33", color: "#fff", border: "1px solid #444" }}
                    />
                  </Form.Group>

                  {/* Gym Logo Upload */}
                  <Form.Group className="mb-4">
                    <Form.Label style={{ color: "#fff" }}>Gym Logo (optional)</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      style={{ backgroundColor: "#2a2a33", color: "#fff", border: "1px solid #444" }}
                    />
                    {preview && (
                      <img
                        src={preview}
                        alt="Gym Logo Preview"
                        style={{
                          marginTop: "12px",
                          width: "110px",
                          height: "110px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          border: "2px solid #ff6835",
                        }}
                      />
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: "#fff" }}>Gym Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Enter full address"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      style={{ backgroundColor: "#2a2a33", color: "#fff", border: "1px solid #444" }}
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    style={{
                      backgroundColor: "#ff6835",
                      border: "none",
                      fontWeight: "bold",
                      padding: "12px 24px",
                      borderRadius: "6px",
                      width: "100%",
                    }}
                  >
                    Register Gym
                  </Button>
                </Form>
              </Card.Body>
            </Card>
        
      </Container>
    </div>
  );
};

