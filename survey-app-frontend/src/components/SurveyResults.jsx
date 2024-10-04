import QuestionResults from './QuestionResults'
import { Col, Container, Row } from 'react-bootstrap'
import { QuestionType } from '../constants/enums'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SurveyResults = () => {
    const { id } = useParams()
    const survey = useSelector(({ surveys }) => surveys.find((s) => s.id === id))
    if (!survey) {
        return <div>Survey not found</div>
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
                </Col>
            </Row>
        </Container>
    )
}

export default SurveyResults
