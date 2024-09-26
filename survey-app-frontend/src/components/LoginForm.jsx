import '../styles.css'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { loginUser } from '../reducers/user'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

const LoginForm = () => {
    const [username, setUsername] = useState('testuser')
    const [password, setPassword] = useState('password123')
    const dispatch = useDispatch()
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            dispatch(loginUser({ username, password }))
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className="auth-container">
            <Form className="auth-form" onSubmit={handleSubmit}>
                <h3 className="fw-bold mb-3 text-center">Welcome back!</h3>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        onChange={({ target }) => setUsername(target.value)}
                        placeholder="Please enter your username"
                        type="username"
                        value={username}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        onChange={({ target }) => setPassword(target.value)}
                        placeholder="Please enter your password"
                        type="password"
                        value={password}
                    />
                </Form.Group>
                <Button className="mb-3 mt-3 w-100" type="submit" variant="primary">
                    Log in
                </Button>
                <div className="text-center mt-3">
                    <p>
                        Don&apos;t have an account? <Link to="/signup">Sign up</Link>
                    </p>
                </div>
            </Form>
        </div>
    )
}

export default LoginForm
