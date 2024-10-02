import { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'

const OtherOption = ({ handleChange, qIdx }) => {
    const [otherValue, setOtherValue] = useState('')
    const handleOtherChange = (event) => {
        const value = event.target.value
        setOtherValue(value)
        handleChange(false, qIdx, value)
    }
    return (
        <Row className="align-items-center" style={{ marginTop: '-6px' }}>
            <Col xs="auto">
                <Form.Check
                    label="Other:"
                    name={qIdx}
                    onChange={() => handleChange(false, qIdx, otherValue)}
                    type="radio"
                    value="Other"
                />
            </Col>
            <Col>
                <Form.Control
                    className="question-form-other-input"
                    onChange={handleOtherChange}
                    placeholder="Your answer"
                    type="text"
                    value={otherValue}
                />
            </Col>
        </Row>
    )
}

export default OtherOption
