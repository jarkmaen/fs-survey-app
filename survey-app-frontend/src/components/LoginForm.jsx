import '../App.css'
import { Button, Form } from 'react-bootstrap'
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
        <div>
            <Form className="login-form" onSubmit={handleSubmit}>
                <h1 className="fw-bold text-center">Welcome</h1>
                <h2 className="text-center">Log in to application</h2>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                        type="username"
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

export default LoginForm