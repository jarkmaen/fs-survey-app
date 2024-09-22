import { respondSurvey } from '../reducers/surveys'
import { Button, Col, Container, Form, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

const SurveyResponse = () => {
    const [response, setResponse] = useState({})
    const dispatch = useDispatch()
    const { id } = useParams()
    const survey = useSelector(({ surveys }) => surveys.find((s) => s.id === id))
    if (!survey) {
        return <div>Survey not found</div>
    }
    const handleChange = (qIdx, text) => {
        setResponse({
            ...response,
            [qIdx]: text
        })
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            dispatch(respondSurvey(id, response))
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <Container>
            <Row>
                <Col>
                    <h2>{survey.title}</h2>
                    <p>{survey.description}</p>
                    <Form onSubmit={handleSubmit}>
                        <ListGroup>
                            {survey.questions.map((question) => (
                                <ListGroupItem key={question.id}>
                                    <Form.Group>
                                        <Form.Label>{question.question}</Form.Label>
                                        {question.options.length > 0 ? (
                                            question.options.map((option, i) => (
                                                <Form.Check
                                                    key={i}
                                                    label={option}
                                                    name={question.id}
                                                    onChange={(e) => handleChange(question.id, e.target.value)}
                                                    type="radio"
                                                    value={option}
                                                />
                                            ))
                                        ) : (
                                            <Form.Control
                                                as="textarea"
                                                onChange={(e) => handleChange(question.id, e.target.value)}
                                                placeholder="Enter here"
                                                rows={3}
                                            />
                                        )}
                                    </Form.Group>
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

export default SurveyResponse
