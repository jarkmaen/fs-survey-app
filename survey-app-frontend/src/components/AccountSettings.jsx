import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import { FaChevronRight, FaList, FaRegCircleUser, FaRegTrashCan } from 'react-icons/fa6'
import { nameValidation } from '../utils/validation'
import { removeUser, updateUser } from '../reducers/user'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const AccountSettings = () => {
    const [errors, setErrors] = useState({})
    const [name, setName] = useState('')
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showNameModal, setShowNameModal] = useState(false)
    const [showSurveysModal, setShowSurveysModal] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userId = useSelector(({ user }) => user?.id)
    const user = useSelector(({ users }) => users.find((u) => u.id === userId))
    if (!user) {
        return null
    }
    const handleDeleteAccount = async () => {
        try {
            const result = await dispatch(removeUser({ id: user.id }))
            if (result.success) {
                setShowDeleteModal(false)
                navigate('/')
            }
        } catch (e) {
            console.log(e)
        }
    }
    const handleNameChange = async (event) => {
        event.preventDefault()
        const errors = nameValidation(name)
        setErrors(errors)
        if (Object.keys(errors).length === 0) {
            try {
                const result = await dispatch(updateUser({ id: user.id, name }))
                if (result.success) {
                    setShowNameModal(false)
                }
            } catch (e) {
                console.log(e)
            }
        }
    }
    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col lg={6} md={8}>
                    <p className="account-settings-text mb-4">Account Settings</p>
                    <div className="account-settings-item" onClick={() => setShowNameModal(true)}>
                        <FaRegCircleUser className="account-settings-icon" />
                        <span>Change Account Name</span>
                        <FaChevronRight style={{ marginLeft: 'auto' }} />
                    </div>
                    <div className="account-settings-item" onClick={() => setShowSurveysModal(true)}>
                        <FaList className="account-settings-icon" />
                        <span>View Your Surveys</span>
                        <FaChevronRight style={{ marginLeft: 'auto' }} />
                    </div>
                    <div className="account-settings-item" onClick={() => setShowDeleteModal(true)}>
                        <FaRegTrashCan className="account-settings-icon" color="#d82c0d" />
                        <span style={{ color: '#d82c0d' }}>Delete Account</span>
                    </div>
                </Col>
            </Row>
            <Modal onHide={() => setShowNameModal(false)} show={showNameModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Set Name</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleNameChange}>
                        <Form.Group>
                            <Form.Control
                                isInvalid={!!errors.name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter name"
                                type="text"
                                value={name}
                            />
                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="w-100" onClick={(e) => handleNameChange(e)} variant="primary">
                        Update Name
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal onHide={() => setShowSurveysModal(false)} show={showSurveysModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Your Surveys</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        {user.surveys.map((survey) => (
                            <li key={survey.id}>
                                <a href="#" onClick={() => navigate(`/surveys/${survey.id}`)}>
                                    {survey.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </Modal.Body>
            </Modal>
            <Modal onHide={() => setShowDeleteModal(false)} show={showDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete your account? This will also delete all your surveys and related
                    data.
                </Modal.Body>
                <Modal.Footer>
                    <Button className="w-100" onClick={handleDeleteAccount} variant="danger">
                        Delete Account
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default AccountSettings
