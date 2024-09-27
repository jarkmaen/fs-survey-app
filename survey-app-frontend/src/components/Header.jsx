import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

const Header = ({ isHome, logout, user }) => {
    const navigate = useNavigate()
    const handleLogout = () => {
        logout()
        navigate('/')
    }
    return (
        <Navbar className="navbar" style={isHome ? { borderBottom: '1px solid white' } : {}}>
            <Container>
                <Navbar.Brand as={Link} className="font-weight-bold navbar-title" to="/">
                    SurveyApp
                </Navbar.Brand>
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
    )
}

export default Header
