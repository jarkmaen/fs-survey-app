import { Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { registerFormValidation } from '../utils/validation'
import { registerUser } from '../reducers/user'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

const RegisterForm = () => {
    const [errors, setErrors] = useState({})
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault()
        const errors = registerFormValidation({ name, username, password })
        setErrors(errors)
        if (Object.keys(errors).length === 0) {
            try {
                const result = await dispatch(registerUser({ name, username, password }))
                if (result.success) {
                    navigate('/')
                }
            } catch (e) {
                console.log(e)
            }
        }
    }
    return (
        <div className="auth-container">
            <Form className="auth-form" onSubmit={handleSubmit}>
                <h3 className="fw-bold mb-3 text-center">Welcome!</h3>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        isInvalid={!!errors.name}
                        onChange={({ target }) => setName(target.value)}
                        placeholder="Please enter your name"
                        type="text"
                        value={name}
                    />
                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        isInvalid={!!errors.username}
                        onChange={({ target }) => setUsername(target.value)}
                        placeholder="Please enter your username"
                        type="text"
                        value={username}
                    />
                    <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        isInvalid={!!errors.password}
                        onChange={({ target }) => setPassword(target.value)}
                        placeholder="Please enter your password"
                        type="password"
                        value={password}
                    />
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
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
