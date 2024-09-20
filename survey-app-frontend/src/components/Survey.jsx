import { addResponse } from '../reducers/responses'
import { Button, Col, Container, Form, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

const Survey = () => {
    const [response, setResponse] = useState({})
    const id = useParams().id
    const survey = useSelector(({ surveys }) => surveys.find(s => s._id === id))
    const dispatch = useDispatch()
    if (!survey) {
        return null
    }
    const handleOptionChange = (qIdx, oIdx) => {
        setResponse({
            ...response,
            [qIdx]: { oIdx }
        })
    }
    const handleTextChange = (qIdx, text) => {
        setResponse({
            ...response,
            [qIdx]: { text }
        })
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        dispatch(addResponse(response, survey))
    }
    return (
        <Container>
            <Row>
                <Col>
                    <h2>{survey.title}</h2>
                    <Form onSubmit={handleSubmit}>
                        <ListGroup>
                            {survey.questions.map((question, qIdx) => (
                                <ListGroupItem key={qIdx}>
                                    <strong>{question.text}</strong>
                                    {question.options.length > 0 ? (
                                        question.options.map((option, oIdx) => (
                                            <Form.Check
                                                id={`option-${oIdx}`}
                                                key={oIdx}
                                                label={option.text}
                                                name={`question-${qIdx}`}
                                                onChange={() => handleOptionChange(qIdx, oIdx)}
                                                type="radio"
                                            />
                                        ))
                                    ) : (
                                        <Form.Group controlId={`question-${qIdx}`}>
                                            <Form.Control
                                                as="textarea"
                                                onChange={(e) => handleTextChange(qIdx, e.target.value)}
                                                placeholder="Enter here"
                                                rows={3}
                                            />
                                        </Form.Group>
                                    )}
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                        <Button type="submit" variant="primary">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Survey