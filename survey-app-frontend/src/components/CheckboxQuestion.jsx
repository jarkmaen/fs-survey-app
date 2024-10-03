import OtherOption from './OtherOption'
import { Form } from 'react-bootstrap'

const CheckboxQuestion = ({ handleChange, question }) => (
    <div>
        {question.options.map((option, oIdx) => (
            <Form.Check
                className="mb-2-5"
                key={oIdx}
                label={option}
                name={question.id}
                onChange={(e) => handleChange(true, false, question.id, e.target.value)}
                type="checkbox"
                value={option}
            />
        ))}
        {question.hasOther && <OtherOption handleChange={handleChange} qIdx={question.id} type="checkbox" />}
    </div>
)

export default CheckboxQuestion
