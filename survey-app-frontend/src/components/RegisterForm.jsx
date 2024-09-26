import '../styles.css'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { registerUser } from '../reducers/user'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

const RegisterForm = () => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            dispatch(registerUser({ name, username, password }))
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className="auth-container">
            <Form className="auth-form" onSubmit={handleSubmit}>
                <h3 className="fw-bold mb-3 text-center">Welcome!</h3>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        onChange={({ target }) => setName(target.value)}
                        placeholder="Please enter your name"
                        type="text"
                        value={name}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        onChange={({ target }) => setUsername(target.value)}
                        placeholder="Please enter your username"
                        type="text"
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
                    Sign up
                </Button>
                <div className="text-center mt-3">
                    <p>
                        Already have an account? <Link to="/login">Log in</Link>
                    </p>
                </div>
            </Form>
        </div>
    )
}

export default RegisterForm
