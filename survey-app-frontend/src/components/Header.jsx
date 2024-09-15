import PropTypes from 'prop-types'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = ({ user, logout }) => {
    const handleLogout = () => {
        logout()
    }
    return (
        <Navbar bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand as={Link} to="/">Survey App</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/open-surveys">Open Surveys</Nav.Link>
                    <Nav.Link as={Link} to="/closed-surveys">Closed Surveys</Nav.Link>
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                        {user ? (
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                        ) : (
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

Header.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }),
    logout: PropTypes.func.isRequired
}

export default Header