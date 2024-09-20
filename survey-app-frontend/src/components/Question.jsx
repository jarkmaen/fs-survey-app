import Option from './Option'
import { Button, Col, Form, Row } from 'react-bootstrap'

const Question = ({ addOption, handleChange, handleOther, qIdx, question }) => (
    <div key={qIdx}>
        <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Question {qIdx + 1}:</Form.Label>
            <Col sm="10">
                <Form.Control
                    onChange={(e) => handleChange(qIdx, null, e)}
                    required
                    type="text"
                    value={question.text}
                />
            </Col>
        </Form.Group>
        {question.options.map((option, oIdx) => (
            <Option
                handleChange={handleChange}
                key={oIdx}
                oIdx={oIdx}
                option={option}
                qIdx={qIdx}
            />
        ))}
        <Form.Group as={Row} className="mb-3">
            <Col sm="2">
                <Form.Check
                    checked={question.isOther}
                    label="Include 'Other' option"
                    onChange={(e) => handleOther(qIdx, e)}
                    type="checkbox"
                />
            </Col>
            <Col sm="10">
                <Form.Text className="text-muted">
                    This will add a text box for responders to specify their unique response.
                </Form.Text>
            </Col>
        </Form.Group>
        <Button className="mb-3" onClick={() => addOption(qIdx)} variant="secondary">
            Add Option
        </Button>
    </div>
)

export default Question