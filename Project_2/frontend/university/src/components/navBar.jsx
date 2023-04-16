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
            University
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Degrees" id="basic-nav-dropdown">
              <NavDropdown.Item href="degreelist">All Degrees</NavDropdown.Item>
              <NavDropdown.Item href="singledegree">Select Degree</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="formdegree">
                Create Degree
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Cohorts" id="basic-nav-dropdown">
              <NavDropdown.Item href="cohortlist">All Cohorts</NavDropdown.Item>
              <NavDropdown.Item href="singlecohort">Select Cohort</NavDropdown.Item>
              <NavDropdown.Item href="modulestocohort">Modules delivered to Cohort</NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item href="formcohort">
                Create Cohort
              </NavDropdown.Item>
            </NavDropdown>
            
            <NavDropdown title="Modules" id="basic-nav-dropdown">
              <NavDropdown.Item href="modulelist">All Modules</NavDropdown.Item>
              <NavDropdown.Item href="singlemodule">Select Module</NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item href="formmodule">
                Create Module
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Students" id="basic-nav-dropdown">
              <NavDropdown.Item href="singlestudent">Select Student</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="formstudent">Create Student</NavDropdown.Item>
              <NavDropdown.Item href="addgrade">Add Grade</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default navbar;