import OtherOption from './OtherOption'
import { Form } from 'react-bootstrap'

const CheckboxQuestion = ({ handleChange, question }) => (
    <div>
        {question.options.map((option, oIdx) => (
            <Form.Check
                key={oIdx}
                label={option}
                name={question.id}
                onChange={(e) => handleChange(true, question.id, e.target.value)}
                style={{ marginBottom: '10px' }}
                type="checkbox"
                value={option}
            />
        ))}
        {question.hasOther && <OtherOption handleChange={handleChange} qIdx={question.id} />}
    </div>
)

export default CheckboxQuestion
