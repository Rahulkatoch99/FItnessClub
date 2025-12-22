import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const AboutPage: React.FC = () => {
  return (
    <div style={{ backgroundColor: "#0a0a0f", color: "#fff", minHeight: "100vh", paddingTop: "60px", paddingBottom: "60px", fontFamily: "'Anton', sans-serif" }}>
      <Container>
        {/* Title */}
        <Row className="mb-5">
          <Col>
            <h1 style={{ color: "#ff6835", fontWeight: "bold", fontSize: "48px" }}>
              About FITNESS CLUB – Built in India. Loved Worldwide.
            </h1>
          </Col>
        </Row>

        {/* Our Journey */}
        <Row className="mb-5">
          <Col>
            <h2 style={{ color: "#ff6835", fontSize: "32px", fontWeight: "bold" }}>Our Journey</h2>
            <p style={{ color: "#ccc", fontSize: "16px", lineHeight: "1.8" }}>
              FITNESS CLUB was born in India with a single mission — to redefine what fitness means in a fast-moving world.
              What started as a single gym in Beckenham quickly grew into a movement, blending Indian discipline with
              international fitness standards. Today, we’re more than just a gym — we’re a <strong>community of athletes, trainers, entrepreneurs, and everyday people who refuse to settle.</strong>
              <br /><br />
              Whether you’re training in Bengaluru or Birmingham, Mumbai or Manhattan — FITNESS CLUB is where ambition meets accountability.
            </p>
          </Col>
        </Row>

        {/* One Platform */}
        <Row className="mb-5">
          <Col>
            <h2 style={{ color: "#ff6835", fontSize: "32px", fontWeight: "bold" }}>One Platform. Unlimited Potential.</h2>
            <p style={{ color: "#ccc", fontSize: "16px", lineHeight: "1.8" }}>
              We don’t just run gyms — we <strong>empower others to run theirs better.</strong>
              <br /><br />
              <strong>Are you a gym owner?</strong> FITNESS CLUB’s centralized platform lets you:
              <ul>
                <li>✅ <strong>Register your gym</strong> with us and become part of a global brand.</li>
                <li>✅ <strong>Monitor your gym performance</strong> — members, revenue, schedules, staff — all in one place.</li>
                <li>✅ <strong>Manage multiple branches</strong> from a single dashboard.</li>
                <li>✅ <strong>Access professional-grade tools</strong> for scheduling, marketing, member engagement, and progress tracking.</li>
                <li>✅ <strong>Network with other gym owners</strong> and stay ahead with community insights.</li>
              </ul>
            </p>
          </Col>
        </Row>

        {/* Future of Fitness */}
        <Row className="mb-5">
          <Col>
            <h2 style={{ color: "#ff6835", fontSize: "32px", fontWeight: "bold" }}>Designed for the Future of Fitness</h2>
            <p style={{ color: "#ccc", fontSize: "16px", lineHeight: "1.8" }}>
              In today’s world, people don’t just want a gym — they want <strong>an experience</strong>. That’s why every FITNESS CLUB location is equipped with:
              <ul>
                <li>✔️ World-class equipment</li>
                <li>✔️ Certified trainers</li>
                <li>✔️ Immersive training programs</li>
                <li>✔️ Clean, safe, motivating environments</li>
              </ul>
              Whether you're stepping in as a member or signing up as a partner, <strong>FITNESS CLUB delivers results that matter.</strong>
            </p>
          </Col>
        </Row>

        {/* Join CTA */}
        <Row>
          <Col>
            <h2 style={{ color: "#ff6835", fontSize: "32px", fontWeight: "bold" }}>Join the Movement</h2>
            <p style={{ color: "#ccc", fontSize: "16px", lineHeight: "1.8" }}>
              Ready to train like never before? <br />
              Or want to grow your gym with our tech-driven ecosystem?
              <br /><br />
              👉 <strong>Become a member or register your gym today.</strong><br />
              Let’s build the future of fitness — together.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutPage;
