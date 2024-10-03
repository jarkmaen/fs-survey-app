import { Form } from 'react-bootstrap'

const CommentBoxQuestion = ({ handleChange, question }) => (
    <Form.Control
        as="textarea"
        className="mb-2-5"
        onChange={(e) => handleChange(false, false, question.id, e.target.value)}
        placeholder="Your answer"
        rows={3}
    />
)

export default CommentBoxQuestion
