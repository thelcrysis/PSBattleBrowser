import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import pslogo from './pslogo.png'
const CustomNavbar = () => {
    return (
        <Navbar bg="light" expand="lg" margin-bottom="40px">
        <Container>
          <Navbar.Brand href="/"><img className="d-inline-block align-top" src={pslogo} height={"30px"}></img> <i>battles</i></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/hot">Hot</Nav.Link>
              <Nav.Link href="/top">Top</Nav.Link>
              <Nav.Link href="/new">New</Nav.Link>              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default CustomNavbar;