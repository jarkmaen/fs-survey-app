import { Col, Container, ListGroup, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SurveyResults = () => {
    const { id } = useParams()
    const survey = useSelector(({ surveys }) => surveys.find((s) => s.id === id))
    if (!survey) {
        return <div>Survey not found</div>
    }
    return (
        <Container>
            <h1>{survey.title}</h1>
            <p>{survey.description}</p>
            {survey.questions.map((question) => (
                <Row className="mb-4" key={question.id}>
                    <Col>
                        <h3>{question.question}</h3>
                        <ListGroup variant="flush">
                            {question.options.length === 0
                                ? question.responses.map((response, i) => (
                                      <ListGroup.Item key={i}>{response}</ListGroup.Item>
                                  ))
                                : question.options.map((option, i) => {
                                      const count = question.responses.filter((response) => response === option).length
                                      return (
                                          <ListGroup.Item key={i}>
                                              {option} - Responses: {count}
                                          </ListGroup.Item>
                                      )
                                  })}
                        </ListGroup>
                    </Col>
                </Row>
            ))}
        </Container>
    )
}

export default SurveyResults
