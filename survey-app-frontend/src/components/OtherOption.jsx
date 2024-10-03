import { Col, Form, Row } from 'react-bootstrap'
import { useRef, useState } from 'react'

const OtherOption = ({ handleChange, qIdx, type }) => {
    const [otherValue, setOtherValue] = useState('')
    const otherRef = useRef(null)
    const handleOtherChange = (event) => {
        const value = event.target.value
        setOtherValue(value)
        if (otherRef.current.checked) {
            handleChange(type === 'checkbox', true, qIdx, value)
        }
    }
    return (
        <Row className="align-items-center mb-2-5" style={{ marginTop: '-6px' }}>
            <Col xs="auto">
                <Form.Check
                    label="Other:"
                    name={qIdx}
                    onChange={() =>
                        handleChange(type === 'checkbox', true, qIdx, otherRef.current.checked ? otherValue : '')
                    }
                    ref={otherRef}
                    type={type === 'radio' ? 'radio' : 'checkbox'}
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
