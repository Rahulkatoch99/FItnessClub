import React from "react";
import { Row, Col, Button } from "react-bootstrap";

export const VibeFitLandingPage: React.FC = () => {
 

  return (
    <div
      style={{
        backgroundColor: "#0a0a0f",
        minHeight: "100vh",
        color: "#fff",
        fontFamily: "'Anton', sans-serif",
      }}
    > 

      {/* Hero Section */}
      <Row
        className="m-0"
        style={{
          minHeight: "calc(100vh - 80px)",
          alignItems: "stretch",
        }}
      >
        <Col
          md={6}
          className="d-flex flex-column justify-content-center align-items-md-start align-items-center text-md-start text-center px-4 px-md-5 py-5"
          style={{ backgroundColor: "#0a0a0f" }}
        >
          <h1
            style={{
              fontSize: "clamp(32px, 6vw, 60px)",
              fontWeight: 800,
              color: "#ff6835",
              marginBottom: 0,
            }}
          >
            FROM INDIA TO THE WORLD
          </h1>
          <h2
            style={{
              fontSize: "clamp(28px, 5vw, 48px)",
              fontWeight: 800,
              color: "#ff6835",
              marginBottom: 30,
            }}
          >
            FITNESS CLUB{" "}
          </h2>
          <h3
            style={{
              fontSize: "clamp(22px, 4vw, 36px)",
              fontWeight: 900,
              marginBottom: 20,
            }}
          >
            TRAIN LIKE A WARRIOR. <br /> TRANSFORM LIKE A LEGEND.
          </h3>
          <p
            style={{
              fontSize: "clamp(14px, 3.5vw, 16px)",
              color: "#ccc",
              lineHeight: 1.6,
              maxWidth: 640,
            }}
          >
            Rooted in India’s spirit of discipline and resilience, Vibefit
            blends <br />
            traditional fitness values with world-class infrastructure. Whether
            you're <br />
            in Mumbai, London, or New York — step into a sanctuary where <br />
            sweat meets purpose, and community fuels progress.
          </p>
          <Button
            variant="danger"
            style={{
              backgroundColor: "#ff6835",
              border: "none",
              padding: "12px 24px",
              marginTop: 20,
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: 8,
              width: "fit-content",
            }}
          >
            JOIN THE MOVEMENT →
          </Button>
        </Col>

        <Col md={6} className="p-0 d-none d-md-block">
          <img
            src="https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?cs=srgb&dl=pexels-anush-1229356.jpg&fm=jpg"
            alt="Workout Woman"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

