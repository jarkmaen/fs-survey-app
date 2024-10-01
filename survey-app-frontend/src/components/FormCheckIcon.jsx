import QuestionType from '../constants/enums'
import { Col, Form } from 'react-bootstrap'

const FormCheckIcon = ({ type }) => (
    <Col className="align-items-center d-flex justify-content-center" sm={1}>
        {type === QuestionType.MULTIPLE_CHOICE ? (
            <Form.Check className="question-form-icon" disabled type="radio" />
        ) : (
            <Form.Check className="question-form-icon" disabled type="checkbox" />
        )}
    </Col>
)

export default FormCheckIcon
