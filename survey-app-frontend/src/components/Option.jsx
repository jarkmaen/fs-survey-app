import EditableField from './EditableField'
import FormCheckIcon from './FormCheckIcon'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { LiaTimesSolid } from 'react-icons/lia'

const Option = ({ error, handleChange, handleDeleteOption, isOther, oIdx, option, qIdx, type }) => (
    <Form.Group as={Row} className="mb-3" key={oIdx}>
        <FormCheckIcon type={type} />
        <Col className="align-items-center d-flex" sm={10}>
            {isOther ? (
                <span className="question-form-other">Other...</span>
            ) : (
                <div className="flex-grow-1">
                    <EditableField
                        error={error}
                        placeholder="Option"
                        setValue={(value) => handleChange({ target: { name: 'option', value } }, oIdx, qIdx)}
                        value={option}
                    />
                </div>
            )}
        </Col>
        <Col className="align-items-center d-flex justify-content-center" sm={1}>
            <Button onClick={() => handleDeleteOption(isOther, oIdx, qIdx)} variant="link">
                <LiaTimesSolid className="question-form-remove" />
            </Button>
        </Col>
    </Form.Group>
)

export default Option
