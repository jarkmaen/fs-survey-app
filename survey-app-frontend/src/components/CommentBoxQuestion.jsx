import { Form } from 'react-bootstrap'

const CommentBoxQuestion = ({ handleChange, question }) => (
    <Form.Control
        as="textarea"
        onChange={(e) => handleChange(false, question.id, e.target.value)}
        placeholder="Your answer"
        rows={3}
    />
)

export default CommentBoxQuestion
