import { Button, Col, Container, Form, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SurveyView = () => {
    const id = useParams().id
    const survey = useSelector(({ surveys }) => surveys.find(s => s._id === id))
    if (!survey) {
        return null
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log('handleSubmit')
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
                                                key={oIdx}
                                                type="radio"
                                                name={`question-${qIdx}`}
                                                label={option.text}
                                                id={`option-${oIdx}`}
                                            />
                                        ))
                                    ) : (
                                        <Form.Group controlId={`question-${qIdx}`}>
                                            <Form.Control as="textarea" rows={3} placeholder="Enter here" />
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

export default SurveyView