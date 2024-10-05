import QuestionResults from './QuestionResults'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { QuestionType } from '../constants/enums'
import { removeSurvey } from '../reducers/surveys'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const SurveyResults = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const survey = useSelector(({ surveys }) => surveys.find((s) => s.id === id))
    const user = useSelector(({ user }) => user)
    if (!survey) {
        return null
    }
    const handleDelete = () => {
        const ok = window.confirm(`Are you sure you want to remove '${survey.title}'?`)
        if (ok) {
            dispatch(removeSurvey(id))
            navigate('/')
        }
    }
    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col lg={8} md={4}>
                    <h2>{survey.title}</h2>
                    <p>{survey.description}</p>
                    {survey.questions.map((question) => (
                        <div className="question-result" key={question.id}>
                            <h4 className="mb-3">
                                Question: {question.question}
                                <span className="question-result-type">
                                    {question.type === QuestionType.CHECKBOX && '(checkbox)'}
                                    {question.type === QuestionType.COMMENT_BOX && '(comment box)'}
                                    {question.type === QuestionType.MULTIPLE_CHOICE && '(multiple choice)'}
                                </span>
                            </h4>
                            {question.type === QuestionType.COMMENT_BOX ? (
                                question.responses.map((response, i) => <div key={i}>- {response}</div>)
                            ) : (
                                <QuestionResults question={question} />
                            )}
                        </div>
                    ))}
                    {user && survey.user.username === user.username && (
                        <Button variant="danger" onClick={handleDelete}>
                            Delete Survey
                        </Button>
                    )}
                </Col>
            </Row>
        </Container>
    )
}

export default SurveyResults
