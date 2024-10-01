import EditableField from './EditableField'
import QuestionForm from './QuestionForm'
import QuestionType from '../constants/enums'
import { addSurvey } from '../reducers/surveys'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { surveyFormValidation } from '../utils/validation'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const SurveyForm = () => {
    const [errors, setErrors] = useState({})
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [questions, setQuestions] = useState([
        { question: '', type: QuestionType.MULTIPLE_CHOICE, hasOther: false, options: [''] }
    ])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const addOption = (qIdx, isOther) => {
        const updated = [...questions]
        if (isOther) {
            updated[qIdx].hasOther = true
        } else {
            updated[qIdx].options.push('')
        }
        setQuestions(updated)
    }
    const addQuestion = () => {
        setQuestions([
            ...questions,
            { question: '', type: QuestionType.MULTIPLE_CHOICE, hasOther: false, options: [''] }
        ])
    }
    const deleteOption = (isOther, oIdx, qIdx) => {
        const updated = [...questions]
        if (isOther) {
            updated[qIdx].hasOther = false
        } else {
            updated[qIdx].options.splice(oIdx, 1)
        }
        setQuestions(updated)
    }
    const deleteQuestion = (qIdx) => {
        const updated = [...questions]
        updated.splice(qIdx, 1)
        setQuestions(updated)
    }
    const handleChange = (event, oIdx, qIdx) => {
        const updated = [...questions]
        const { name, value } = event.target
        if (name === 'option') {
            updated[qIdx].options[oIdx] = value
        } else if (name === 'question') {
            updated[qIdx].question = value
        } else if (name === 'type') {
            updated[qIdx].type = event.target.value
        }
        setQuestions(updated)
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        setErrors({})
        const errors = surveyFormValidation({ title, description, questions })
        setErrors(errors)
        if (Object.keys(errors).length === 0) {
            try {
                const result = await dispatch(addSurvey({ title, description, questions }))
                if (result.success) {
                    navigate('/')
                }
            } catch (e) {
                console.log(e)
            }
        }
    }
    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col lg={6} md={8}>
                    <Form onSubmit={handleSubmit}>
                        <EditableField
                            error={errors.title}
                            placeholder="Survey Title"
                            setValue={setTitle}
                            value={title}
                        />
                        <EditableField
                            error={errors.description}
                            placeholder="Description"
                            setValue={setDescription}
                            value={description}
                        />
                        <hr />
                        {questions.map((question, qIdx) => (
                            <QuestionForm
                                addOption={addOption}
                                deleteOption={deleteOption}
                                deleteQuestion={deleteQuestion}
                                errors={errors.questions ? errors.questions[qIdx] : {}}
                                handleChange={handleChange}
                                key={qIdx}
                                qIdx={qIdx}
                                question={question}
                            />
                        ))}
                        <div className="mb-3">
                            <button className="survey-form-button" onClick={addQuestion} type="button">
                                Add Question
                            </button>
                        </div>
                        <Row>
                            <Col style={{ paddingRight: '16px' }} xs={9}>
                                <Button className="w-100" type="submit">
                                    Create Survey
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

export default SurveyForm
