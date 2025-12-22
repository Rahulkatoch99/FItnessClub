import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { Footer } from '../footer/footer';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    // { label: "Classes", path: "/classes" },
    // { label: "Schedule", path: "/schedule" },
    // { label: "Advantages", path: "/advantages" },
    { label: "Pricing", path: "/pricing" },
    { label: "Contact", path: "/contact" },
    { label: "Sign In", path: "/signin" },
    { label: "Sign Up", path: "/signup" },

  ];

  return (
    <div style={{ backgroundColor: "#0a0a0f", minHeight: "100vh", color: "#fff" }}>
      <Navbar bg="transparent" variant="dark" expand="lg" style={{ borderBottom: "1px solid #333", padding: '20px 0 10px 40px' }}>
        <Container>
          <Navbar.Brand href="#" style={{ display: "flex", alignItems: "center" }}>
            <FitnessCenterIcon style={{ color: "#ff6835", fontSize: 40, marginRight: 8 }} />
            <span style={{ color: "#ff6835", fontWeight: "bold", fontSize: "24px" }}>FITNESS CLUB</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto" style={{ gap: "10px" }}>
              {navItems.map((item) => (
                <Nav.Link
                  key={item.label}
                  onClick={() => navigate(item.path)}   
                  style={{
                    cursor: "pointer",
                    color: location.pathname === item.path ? "#ff6835" : "#fff",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  {item.label}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div style={{ paddingTop: "40px" }}>
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
};

export default Layout;
