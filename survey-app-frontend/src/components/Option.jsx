import { Col, Form, Row } from 'react-bootstrap'

const Option = ({ handleChange, oIdx, option, qIdx }) => (
    <Form.Group as={Row} className="mb-3" key={oIdx}>
        <Form.Label column sm="2">Option {oIdx + 1}:</Form.Label>
        <Col sm="10">
            <Form.Control
                onChange={(e) => handleChange(qIdx, oIdx, e)}
                required
                type="text"
                value={option.text}
            />
        </Col>
    </Form.Group>
)

export default Option