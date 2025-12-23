import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// Assuming you are using MUI Icons, which are type-safe and reliable.
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
  // Define style variables for consistency with your design
  const primaryBg = "#0a0a0f";
  const accentColor = "#ff6835";
  const textColor = "#ccc";
  const linkColor = "#fff";
  const borderColor = "#333";

  return (
    // Outer container wrapper
    <div style={{ backgroundColor: primaryBg, color: textColor, paddingTop: '10px' }}>
      
      {/* 1. React Bootstrap Container */}
      <Container>
        
        {/* Main Content Row */}
        <Row style={{ borderBottom: `1px solid ${borderColor}` }}>
          
          {/* 1. Brand / Mission (Col 1) */}
          <Col xs={12} md={4} lg={3} className="mb-4 mb-md-0">
            <div className="d-flex align-items-center gap-2" style={{ color: linkColor, fontSize: '1.5rem', fontWeight: '800', marginBottom: '15px' }}>
              {/* Note: MUI icons are used here. You may need to wrap them in a span if they don't accept style props directly in JSX */}
              <FitnessCenterIcon style={{ color: accentColor, fontSize: '1.8rem' }} />
              FITNESS CLUB
            </div>
            <p style={{ fontSize: '0.9rem', color: textColor }}>
              Join the strongest fitness community and achieve your transformation goals with expert trainers and world-class equipment.
            </p>
          </Col>

          {/* 2. Quick Links (Col 2) */}
          <Col xs={6} md={2} lg={3} className="mb-4 mb-md-0">
            <h5 style={{ color: linkColor, fontWeight: 'bold', marginBottom: '20px' }}>Quick Links</h5>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem' }}>
              <li className="mb-2"><a href="/home" style={{ color: textColor, textDecoration: 'none' }}>Home</a></li>
              <li className="mb-2"><a href="/plans" style={{ color: textColor, textDecoration: 'none' }}>Plans</a></li>
              <li className="mb-2"><a href="/trainers" style={{ color: textColor, textDecoration: 'none' }}>Trainers</a></li>
              <li className="mb-2"><a href="/contact" style={{ color: textColor, textDecoration: 'none' }}>Contact</a></li>
            </ul>
          </Col>

          {/* 3. Support (Col 3) */}
          <Col xs={6} md={2} lg={3} className="mb-4 mb-md-0">
            <h5 style={{ color: linkColor, fontWeight: 'bold', marginBottom: '20px' }}>Support</h5>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem' }}>
              <li className="mb-2"><a href="/faq" style={{ color: textColor, textDecoration: 'none' }}>FAQs</a></li>
              <li className="mb-2"><a href="/help" style={{ color: textColor, textDecoration: 'none' }}>Help Center</a></li>
              <li className="mb-2"><a href="/terms" style={{ color: textColor, textDecoration: 'none' }}>Terms & Conditions</a></li>
              <li className="mb-2"><a href="/privacy" style={{ color: textColor, textDecoration: 'none' }}>Privacy Policy</a></li>
            </ul>
          </Col>

          {/* 4. Contact & Social (Col 4) */}
          <Col xs={12} md={4} lg={3}>
            <h5 style={{ color: linkColor, fontWeight: 'bold', marginBottom: '20px' }}>Get In Touch</h5>
            <p style={{ fontSize: '0.9rem', marginBottom: '5px' }}>📍 New Delhi, India</p>
            <p style={{ fontSize: '0.9rem', marginBottom: '5px' }}>📞 +91 9910935066</p>
            <p style={{ fontSize: '0.9rem', marginBottom: '15px' }}>✉️ info@fitnessClub.com</p>

            {/* Social Icons */}
            <div className="d-flex gap-3" style={{ fontSize: '1.5rem', marginTop: '10px' }}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: accentColor }} aria-label="Facebook"><FacebookIcon /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: accentColor }} aria-label="Instagram"><InstagramIcon /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: accentColor }} aria-label="Twitter"><TwitterIcon /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{ color: accentColor }} aria-label="Youtube"><YouTubeIcon /></a>
            </div>
          </Col>
        </Row>

        {/* Copyright Bar Row */}
        <Row className="text-center" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
          <Col>
            <p style={{ fontSize: '0.8rem', color: '#777', margin: 0 }}>
              &copy; {new Date().getFullYear()} FITNESS CLUB - Rahul Katoch. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};