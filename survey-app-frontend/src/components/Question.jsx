import Option from './Option'
import { Button, Col, Form, Row } from 'react-bootstrap'

const Question = ({ addOption, handleChange, qIdx, question }) => (
    <div key={qIdx}>
        <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
                Question {qIdx + 1}:
            </Form.Label>
            <Col sm="10">
                <Form.Control
                    onChange={(event) => handleChange(event, null, qIdx)}
                    required
                    type="text"
                    value={question.text}
                />
            </Col>
        </Form.Group>
        {question.options.map((option, oIdx) => (
            <Option handleChange={handleChange} key={oIdx} oIdx={oIdx} option={option} qIdx={qIdx} />
        ))}
        <Button className="mb-3" onClick={() => addOption(qIdx)} variant="secondary">
            Add Option
        </Button>
    </div>
)

export default Question
