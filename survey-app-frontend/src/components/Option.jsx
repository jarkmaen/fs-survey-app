import EditableField from './EditableField'
import QuestionType from '../constants/enums'
import { Col, Form, Row } from 'react-bootstrap'

const Option = ({ handleChange, oIdx, option, qIdx, type }) => (
    <Form.Group as={Row} className="mb-3" key={oIdx}>
        <Col className="align-items-center d-flex justify-content-center" sm="1">
            {type === QuestionType.MULTIPLE_CHOICE ? (
                <Form.Check className="question-form-icon" disabled type="radio" />
            ) : (
                <Form.Check className="question-form-icon" disabled type="checkbox" />
            )}
        </Col>
        <Col sm="11">
            <EditableField
                placeholder="Option"
                setValue={(value) => handleChange({ target: { value } }, oIdx, qIdx)}
                value={option.text}
            />
        </Col>
    </Form.Group>
)

const OtherOption = ({ type }) => (
    <Form.Group as={Row} className="mb-3">
        <Col className="align-items-center d-flex justify-content-center" sm="1">
            {type === QuestionType.MULTIPLE_CHOICE ? (
                <Form.Check className="question-form-icon" type="radio" disabled />
            ) : (
                <Form.Check className="question-form-icon" type="checkbox" disabled />
            )}
        </Col>
        <Col sm="11">
            <span style={{ color: '#70757a', padding: '4px' }}>Other...</span>
        </Col>
    </Form.Group>
)

export { Option, OtherOption }

export default Option
