import { Button, Container, Dropdown, Nav, Navbar } from 'react-bootstrap'
import { CustomMenu, CustomToggle } from './CustomDropdown'
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
                            <>
                                <span style={{ marginRight: '5px' }}>Signed in as:</span>
                                <Dropdown>
                                    <Dropdown.Toggle as={CustomToggle}>{user.name}</Dropdown.Toggle>
                                    <Dropdown.Menu as={CustomMenu}>
                                        <Dropdown.Item onClick={() => navigate('/account-settings')}>
                                            Account Settings
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </>
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
