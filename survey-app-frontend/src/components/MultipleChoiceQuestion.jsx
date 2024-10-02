import OtherOption from './OtherOption'
import { Form } from 'react-bootstrap'

const MultipleChoiceQuestion = ({ handleChange, question }) => (
    <div>
        {question.options.map((option, oIdx) => (
            <Form.Check
                key={oIdx}
                label={option}
                name={question.id}
                onChange={(e) => handleChange(false, question.id, e.target.value)}
                style={{ marginBottom: '10px' }}
                type="radio"
                value={option}
            />
        ))}
        {question.hasOther && <OtherOption handleChange={handleChange} qIdx={question.id} />}
    </div>
)

export default MultipleChoiceQuestion
