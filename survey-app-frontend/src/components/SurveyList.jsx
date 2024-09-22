import { Button, Card, Col, Row } from 'react-bootstrap'
import { FaClipboardList, FaClock } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SurveyList = ({ closed }) => {
    const surveys = useSelector(({ surveys }) => surveys)
    const filteredSurveys = surveys.filter((survey) => survey.closed === closed)
    const closeSurvey = (title) => {
        console.log(`closing survey ${title}`)
    }
    return (
        <div>
            <Row>
                {filteredSurveys.map((survey) => {
                    const time = (survey.questions.length * 0.5).toFixed(1)
                    return (
                        <Col className="mb-4" key={survey.id} md={4}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        <FaClipboardList /> Survey
                                    </Card.Title>
                                    <Card.Text>
                                        <strong>{survey.title}</strong>
                                    </Card.Text>
                                    <Card.Text>
                                        <FaClock /> ~{time} min
                                    </Card.Text>
                                    <div className="d-flex justify-content-between">
                                        <Button
                                            as={Link}
                                            className="flex-grow-1 mx-1"
                                            to={`/surveys/${survey.id}`}
                                            variant="primary"
                                        >
                                            {closed ? 'View Results' : 'Take Survey'}
                                        </Button>
                                        {!closed && (
                                            <Button
                                                className="flex-grow-1 mx-1"
                                                onClick={() => closeSurvey(survey.title)}
                                                variant="danger"
                                            >
                                                Close Survey
                                            </Button>
                                        )}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}

export default SurveyList
