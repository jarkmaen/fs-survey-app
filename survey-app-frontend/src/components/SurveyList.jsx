import { Button, Card, Col, Row } from 'react-bootstrap'
import { closeSurvey } from '../reducers/surveys'
import { FaClipboardList, FaClock } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const SurveyList = ({ closed }) => {
    const dispatch = useDispatch()
    const surveys = useSelector(({ surveys }) => surveys)
    const filteredSurveys = surveys.filter((survey) => survey.closed === closed)
    const handleCloseSurvey = async (event, id) => {
        event.preventDefault()
        try {
            dispatch(closeSurvey(id))
        } catch (e) {
            console.log(e)
        }
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
                                                onClick={(event) => handleCloseSurvey(event, survey.id)}
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
