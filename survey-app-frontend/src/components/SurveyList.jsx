import { Button, Card, Col, Row } from 'react-bootstrap'
import { FaClipboardList, FaClock } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SurveyList = () => {
    const surveys = useSelector(({ surveys }) => surveys)
    const closeSurvey = (title) => {
        console.log(`closing survey ${title}`)
    }
    return (
        <div>
            <Row>
                {surveys.map((survey) => (
                    <Col className="mb-4" key={survey._id} md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <FaClipboardList /> Survey
                                </Card.Title>
                                <Card.Text>
                                    <strong>{survey.title}</strong>
                                </Card.Text>
                                <Card.Text>
                                    <FaClock /> ~3 min
                                </Card.Text>
                                <div className="d-flex justify-content-between">
                                    <Button as={Link} className="flex-grow-1 mx-1" to={`/surveys/${survey._id}`} variant="primary">
                                        Take Survey
                                    </Button>
                                    <Button className="flex-grow-1 mx-1" onClick={() => closeSurvey(survey.title)} variant="danger">
                                        Close Survey
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default SurveyList