import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function navbar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
      <Navbar.Brand href="/">
            <img
              alt=""
              src="/shibthinking.gif"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            SHOP
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Category" id="basic-nav-dropdown">
              <NavDropdown.Item href="category">Single Category</NavDropdown.Item>
              <NavDropdown.Item href="status">Order Status</NavDropdown.Item>
              <NavDropdown.Item href="singlecustomer">Single Customer</NavDropdown.Item>
              <NavDropdown.Item href="orderinfo">Order Info</NavDropdown.Item>

            </NavDropdown>
            


          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default navbar;