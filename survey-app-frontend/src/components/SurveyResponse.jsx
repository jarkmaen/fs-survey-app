import CheckboxQuestion from './CheckboxQuestion'
import CommentBoxQuestion from './CommentBoxQuestion'
import MultipleChoiceQuestion from './MultipleChoiceQuestion'
import QuestionType from '../constants/enums'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { respondSurvey } from '../reducers/surveys'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

const SurveyResponse = () => {
    const [response, setResponse] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const survey = useSelector(({ surveys }) => surveys.find((s) => s.id === id))
    if (!survey) {
        return <div>Survey not found</div>
    }
    const handleChange = (isCheckbox, qIdx, value) => {
        setResponse((previous) => {
            if (isCheckbox) {
                const current = previous[qIdx] || []
                if (current.includes(value)) {
                    return {
                        ...previous,
                        [qIdx]: current.filter((v) => v !== value)
                    }
                } else {
                    return {
                        ...previous,
                        [qIdx]: [...current, value]
                    }
                }
            } else {
                return {
                    ...previous,
                    [qIdx]: value
                }
            }
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
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col lg={6} md={8}>
                    <h2>{survey.title}</h2>
                    <p>{survey.description}</p>
                    <Form onSubmit={handleSubmit}>
                        {survey.questions.map((question) => (
                            <div className="question-form" key={question.id}>
                                <Form.Group>
                                    <Form.Label>{question.question}</Form.Label>
                                    {question.type === QuestionType.CHECKBOX ? (
                                        <CheckboxQuestion handleChange={handleChange} question={question} />
                                    ) : question.type === QuestionType.COMMENT_BOX ? (
                                        <CommentBoxQuestion handleChange={handleChange} question={question} />
                                    ) : question.type === QuestionType.MULTIPLE_CHOICE ? (
                                        <MultipleChoiceQuestion handleChange={handleChange} question={question} />
                                    ) : null}
                                </Form.Group>
                            </div>
                        ))}
                        <Row>
                            <Col style={{ paddingRight: '16px' }} xs={9}>
                                <Button className="w-100" type="submit">
                                    Submit
                                </Button>
                            </Col>
                            <Col style={{ paddingLeft: '0px' }} xs={3}>
                                <Button className="w-100" onClick={() => navigate('/')} variant="outline-primary">
                                    Cancel
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default SurveyResponse
