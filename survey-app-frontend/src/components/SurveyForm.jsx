import Question from './Question'
import { addSurvey } from '../reducers/surveys'
import { Button, Container, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

const SurveyForm = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [questions, setQuestions] = useState([{ question: '', options: [''] }])
    const dispatch = useDispatch()
    const addOption = (qIdx) => {
        const updated = [...questions]
        updated[qIdx].options.push('')
        setQuestions(updated)
    }
    const addQuestion = () => {
        setQuestions([...questions, { question: '', options: [''] }])
    }
    const handleChange = (event, oIdx, qIdx) => {
        const updated = [...questions]
        if (oIdx === null) {
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
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Survey Title:</Form.Label>
                    <Form.Control
                        onChange={({ target }) => setTitle(target.value)}
                        required
                        type="text"
                        value={title}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Survey Description:</Form.Label>
                    <Form.Control
                        onChange={({ target }) => setDescription(target.value)}
                        required
                        type="text"
                        value={description}
                    />
                </Form.Group>
                {questions.map((question, qIdx) => {
                    return (
                        <Question
                            addOption={addOption}
                            handleChange={handleChange}
                            key={qIdx}
                            qIdx={qIdx}
                            question={question}
                        />
                    )
                })}
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
        </Container>
    )
}

export default SurveyForm
