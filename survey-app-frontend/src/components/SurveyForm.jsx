import Question from './Question'
import { addSurvey } from '../reducers/surveys'
import { Button, Container, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

const SurveyForm = () => {
    const [title, setTitle] = useState('')
    const [questions, setQuestions] = useState([
        {
            text: '',
            options: [{ text: '' }],
            isOther: false
        }
    ])
    const dispatch = useDispatch()
    const addOption = (qIdx) => {
        setQuestions((current) => {
            const updated = [...current]
            updated[qIdx].options.push({ text: '' })
            return updated
        })
    }
    const addQuestion = () => {
        setQuestions((current) => [
            ...current,
            { text: '', options: [{ text: '' }], isOther: false }
        ])
    }
    const handleChange = (qIdx, oIdx, e) => {
        setQuestions((current) => {
            const updated = [...current]
            if (oIdx === null) {
                updated[qIdx].text = e.target.value
            } else {
                updated[qIdx].options[oIdx].text = e.target.value
            }
            return updated
        })
    }
    const handleOther = (qIdx, e) => {
        setQuestions((current) => {
            const updated = [...current]
            updated[qIdx].isOther = e.target.checked
            return updated
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(addSurvey({ title, questions }))
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
                {questions.map((question, qIdx) => (
                    <Question
                        addOption={addOption}
                        handleChange={handleChange}
                        handleOther={handleOther}
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
        </Container>
    )
}

export default SurveyForm