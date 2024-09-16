import '../app.css'
import { Button, Form } from 'react-bootstrap'
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
        <div>
            <Form className="auth-form" onSubmit={handleSubmit}>
                <h1 className="fw-bold text-center">Welcome</h1>
                <h2 className="text-center">Register to application</h2>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                        type="text"
                        placeholder="Enter your name"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                        type="text"
                        placeholder="Enter username"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Group>
                <Button type="submit" variant="primary">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default RegisterForm