import EditableField from './EditableField'
import QuestionForm from './QuestionForm'
import QuestionType from '../constants/enums'
import { addSurvey } from '../reducers/surveys'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

const SurveyForm = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [questions, setQuestions] = useState([
        { question: '', type: QuestionType.MULTIPLE_CHOICE, hasOther: false, options: [] }
    ])
    const dispatch = useDispatch()
    const addOption = (qIdx, otherAdded) => {
        const updated = [...questions]
        if (otherAdded) {
            updated[qIdx].hasOther = true
        } else {
            updated[qIdx].options.push('')
        }
        setQuestions(updated)
    }
    const addQuestion = () => {
        setQuestions([...questions, { question: '', type: QuestionType.MULTIPLE_CHOICE, hasOther: false, options: [] }])
    }
    const handleChange = (event, oIdx, qIdx, type) => {
        const updated = [...questions]
        if (oIdx === null && type) {
            updated[qIdx].type = event.target.value
        } else if (oIdx === null) {
            updated[qIdx].question = event.target.value
        } else {
            updated[qIdx].options[oIdx] = event.target.value
        }
        setQuestions(updated)
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            dispatch(addSurvey({ title, description, questions }))
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col lg={6} md={8}>
                    <Form onSubmit={handleSubmit}>
                        <EditableField placeholder="Survey Title" setValue={setTitle} value={title} />
                        <EditableField placeholder="Description" setValue={setDescription} value={description} />
                        <hr />
                        {questions.map((question, qIdx) => (
                            <QuestionForm
                                addOption={addOption}
                                handleChange={handleChange}
                                key={qIdx}
                                qIdx={qIdx}
                                question={question}
                            />
                        ))}
                        <div className="mb-3">
                            <Button onClick={addQuestion} variant="secondary">
                                Add Question
                            </Button>
                        </div>
                        <div className="mb-3">
                            <Button type="submit" variant="primary">
                                Create Survey
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default SurveyForm
