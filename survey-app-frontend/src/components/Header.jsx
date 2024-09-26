import '../styles.css'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

const Header = ({ user, logout }) => {
    const navigate = useNavigate()
    const handleLogout = () => {
        logout()
        navigate('/')
    }
    return (
        <div className="navbar-wrapper">
            <Navbar className="navbar">
                <Container>
                    <Navbar.Brand as={Link} className="font-weight-bold navbar-title" to="/">
                        SurveyApp
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/create-survey">
                            Create Survey
                        </Nav.Link>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            {user ? (
                                <Navbar.Text>
                                    Signed in as:{' '}
                                    <a href="#" onClick={handleLogout}>
                                        {user.name}
                                    </a>
                                </Navbar.Text>
                            ) : (
                                <Button className="navbar-button" onClick={() => navigate('/login')} variant="primary">
                                    Log in or Sign up
                                </Button>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header
