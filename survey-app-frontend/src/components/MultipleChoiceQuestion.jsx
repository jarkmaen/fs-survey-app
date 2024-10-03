import OtherOption from './OtherOption'
import { Form } from 'react-bootstrap'

const MultipleChoiceQuestion = ({ handleChange, question }) => (
    <div>
        {question.options.map((option, oIdx) => (
            <Form.Check
                className="mb-2-5"
                key={oIdx}
                label={option}
                name={question.id}
                onChange={(e) => handleChange(false, false, question.id, e.target.value)}
                type="radio"
                value={option}
            />
        ))}
        {question.hasOther && <OtherOption handleChange={handleChange} qIdx={question.id} type="radio" />}
    </div>
)

export default MultipleChoiceQuestion
