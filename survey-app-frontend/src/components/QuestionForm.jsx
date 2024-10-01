import EditableField from './EditableField'
import FormCheckIcon from './FormCheckIcon'
import Option from './Option'
import QuestionType from '../constants/enums'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaRegTrashCan } from 'react-icons/fa6'
import { useState } from 'react'

const QuestionForm = ({ addOption, deleteOption, deleteQuestion, errors = {}, handleChange, qIdx, question }) => {
    const [otherAdded, setOtherAdded] = useState(false)
    const [type, setType] = useState(QuestionType.MULTIPLE_CHOICE)
    const handleDeleteOption = (isOther, oIdx, qIdx) => {
        deleteOption(isOther, oIdx, qIdx)
        setOtherAdded(false)
    }
    const handleAddOther = () => {
        addOption(qIdx, true)
        setOtherAdded(true)
    }
    const handleTypeChange = (event) => {
        const value = event.target.value
        handleChange({ target: { name: 'type', value } }, null, qIdx)
        setType(value)
    }
    return (
        <div className="question-form" key={qIdx}>
            <EditableField
                error={errors.question}
                placeholder="Question"
                setValue={(value) => handleChange({ target: { name: 'question', value } }, null, qIdx)}
                value={question.question}
            />
            {type === QuestionType.COMMENT_BOX ? (
                <Form.Group as={Row} className="mb-3">
                    <Col>
                        <Form.Control as="textarea" readOnly rows={3} />
                    </Col>
                </Form.Group>
            ) : (
                <div>
                    {question.options.map((option, oIdx) => (
                        <Option
                            error={errors.options ? errors.options[oIdx] : ''}
                            handleChange={handleChange}
                            handleDeleteOption={handleDeleteOption}
                            key={oIdx}
                            oIdx={oIdx}
                            option={option}
                            qIdx={qIdx}
                            type={type}
                        />
                    ))}
                    {otherAdded && (
                        <Option handleDeleteOption={handleDeleteOption} isOther={true} qIdx={qIdx} type={type} />
                    )}
                    <Form.Group as={Row} className="mb-3">
                        <FormCheckIcon type={type} />
                        <Col sm="11">
                            <span className="question-form-text" onClick={() => addOption(qIdx)}>
                                Add option
                            </span>
                            {!otherAdded && (
                                <>
                                    {' or '}
                                    <span className="question-form-text" onClick={handleAddOther}>
                                        Add &quot;Other&quot;
                                    </span>
                                </>
                            )}
                        </Col>
                    </Form.Group>
                </div>
            )}
            <Form.Group as={Row}>
                <Col sm={4}>
                    <Form.Select onChange={handleTypeChange} value={type}>
                        <option value={QuestionType.CHECKBOX}>Checkbox</option>
                        <option value={QuestionType.COMMENT_BOX}>Comment Box</option>
                        <option value={QuestionType.MULTIPLE_CHOICE}>Multiple Choice</option>
                    </Form.Select>
                </Col>
                <Col className="text-end" sm={8}>
                    <Button className="question-form-delete" onClick={() => deleteQuestion(qIdx)} variant="link">
                        <FaRegTrashCan /> Delete
                    </Button>
                </Col>
            </Form.Group>
        </div>
    )
}

export default QuestionForm
