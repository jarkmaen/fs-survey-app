import { Container, Nav, Navbar } from 'react-bootstrap';

const Header = () => {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">Survey App</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#">Open Surveys</Nav.Link>
                    <Nav.Link href="#">Closed Surveys</Nav.Link>
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Nav.Link href="#">Sign Up</Nav.Link>
                        <Nav.Link href="#">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;