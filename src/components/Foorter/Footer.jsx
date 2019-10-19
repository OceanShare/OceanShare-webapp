import React from "react";

// reactstrap components
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";

class Footer extends React.Component {
  render() {
    const currentDate = new Date().getFullYear();
    return (
      <footer className="footer fixed-bottom">
        <Container fluid>
          <Row className="align-items-center justify-content-xl-between">
            <Col xl="6">
              <div className="copyright text-center text-xl-left text-muted">
                © {currentDate + " "}
                <a
                  className="font-weight-bold ml-1"
                  href="https://guillaume.sagot.io/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Guillaume SAGOT
                </a>
              </div>
            </Col>

            <Col xl="6">
              <Nav className="nav-footer justify-content-center justify-content-xl-end">
                <NavItem>
                  <NavLink
                    href="https://www.creative-tim.com/presentation?ref=adr-admin-footer"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    About Us
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}

export default Footer;
