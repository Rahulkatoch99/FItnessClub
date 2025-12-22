import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const pricingPlans = [
  {
    title: "Starter",
    price: "₹2,499 / $29 per month",
    summary: "Built for individual gyms and fitness studios managing single locations.",
    features: [
      "Member management system",
      "Online class bookings",
      "Payment collection tools",
      "Basic trainer scheduling",
    ],
    buttonText: "Get Started",
    background: "#1e1e26",
  },
  {
    title: "Growth",
    price: "₹5,999 / $69 per month",
    summary: "For growing gyms with 2-5 locations and expanding staff.",
    features: [
      "Everything in Starter",
      "Multi-branch dashboard",
      "Attendance tracking",
      "Performance and revenue reports",
      "Priority customer support",
    ],
    buttonText: "Upgrade to Growth",
    background: "#25252e",
  },
  {
    title: "Enterprise",
    price: "₹11,999 / $139 per month",
    summary: "Built for gym chains, franchises, and high-volume fitness brands.",
    features: [
      "Everything in Growth",
      "Marketing automation suite",
      "White-label member portal",
      "Advanced analytics and CRM",
      "Dedicated account manager",
    ],
    buttonText: "Talk to Sales",
    background: "#2f2f39",
  },
];

const PricingPage: React.FC = () => {
  return (
    <div style={{ backgroundColor: "#0a0a0f", color: "#fff", padding: "60px 0", minHeight: "80vh" }}>
      <Container>
        <h2
          style={{
            color: "#ff6835",
            fontWeight: 700,
            textAlign: "center",
            fontSize: "36px",
            marginBottom: "16px",
          }}
        >
          Pricing That Grows With Your Gym
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "#aaa",
            fontSize: "16px",
            maxWidth: "600px",
            margin: "0 auto 48px",
          }}
        >
          Flexible plans designed for every stage of your fitness business. Scale confidently with the tools you need.
        </p>

        <Row className="g-4">
          {pricingPlans.map((plan, index) => (
            <Col key={index} xs={12} md={4} className="d-flex">
              <Card
                style={{
                  backgroundColor: plan.background,
                  border: "1px solid #333",
                  borderRadius: "12px",
                  padding: "24px",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Card.Body style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <Card.Title style={{ fontSize: "22px", fontWeight: 600, color: "#ff6835" }}>
                    {plan.title}
                  </Card.Title>
                  <Card.Subtitle style={{ fontSize: "18px", color: "#ddd", marginBottom: "16px" }}>
                    {plan.price}
                  </Card.Subtitle>
                  <p style={{ fontSize: "14px", color: "#bbb", marginBottom: "20px", flexShrink: 0 }}>
                    {plan.summary}
                  </p>
                  <ul style={{ paddingLeft: "20px", fontSize: "14px", color: "#ccc", marginBottom: "auto" }}>
                    {plan.features.map((feature, i) => (
                      <li key={i} style={{ marginBottom: "8px" }}>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4">
                    <Button
                      variant="danger"
                      style={{
                        backgroundColor: "#ff6835",
                        border: "none",
                        fontWeight: 600,
                        width: "100%",
                        padding: "12px",
                        borderRadius: "6px",
                      }}
                    >
                      {plan.buttonText}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default PricingPage;
