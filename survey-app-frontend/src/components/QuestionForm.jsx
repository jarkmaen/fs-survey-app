import EditableField from './EditableField'
import QuestionType from '../constants/enums'
import { Col, Form, Row } from 'react-bootstrap'
import { Option, OtherOption } from './Option'
import { useState } from 'react'

const QuestionForm = ({ addOption, handleChange, qIdx, question }) => {
    const [type, setType] = useState(QuestionType.MULTIPLE_CHOICE)
    const [otherAdded, setOtherAdded] = useState(false)
    const handleAddOption = () => {
        addOption(qIdx)
    }
    const handleAddOther = () => {
        addOption(qIdx, true)
        setOtherAdded(true)
    }
    const handleTypeChange = (event) => {
        handleChange(event, 0, qIdx, true)
        setType(event.target.value)
    }
    return (
        <div className="question-form" key={qIdx}>
            <EditableField
                placeholder="Question"
                setValue={(value) => handleChange({ target: { value } }, null, qIdx)}
                value={question.text}
            />
            <Form.Group as={Row} className="mb-3">
                <Col sm="12">
                    <Form.Select onChange={handleTypeChange} value={type}>
                        <option value={QuestionType.MULTIPLE_CHOICE}>Multiple Choice</option>
                        <option value={QuestionType.CHECKBOX}>Checkbox</option>
                        <option value={QuestionType.COMMENT_BOX}>Comment Box</option>
                    </Form.Select>
                </Col>
            </Form.Group>
            {type === QuestionType.COMMENT_BOX ? (
                <Form.Group as={Row} className="mb-3">
                    <Col sm="12">
                        <Form.Control as="textarea" readOnly rows={3} />
                    </Col>
                </Form.Group>
            ) : (
                <div>
                    {question.options.map((option, oIdx) => (
                        <Option
                            handleChange={handleChange}
                            key={oIdx}
                            oIdx={oIdx}
                            option={option}
                            qIdx={qIdx}
                            type={type}
                        />
                    ))}
                    {otherAdded && <OtherOption type={type} />}
                    <Form.Group as={Row} className="mb-3">
                        <Col sm="1" className="align-items-center d-flex justify-content-center">
                            <Form.Check
                                className="question-form-icon"
                                disabled
                                type={type === QuestionType.MULTIPLE_CHOICE ? 'radio' : 'checkbox'}
                            />
                        </Col>
                        <Col sm="11">
                            <span className="question-form-text" onClick={handleAddOption}>
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
        </div>
    )
}

export default QuestionForm
