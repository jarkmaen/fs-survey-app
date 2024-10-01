import { Form } from 'react-bootstrap'
import { useState } from 'react'

const EditableField = ({ error, placeholder, setValue, value }) => {
    const [isEdited, setIsEdited] = useState(false)
    const handleChange = (event) => {
        setValue(event.target.value)
        setIsEdited(true)
    }
    const isTitle = placeholder === 'Survey Title'
    const fontSize = isTitle ? 'editable-field-title' : ''
    const marginBottom = isTitle ? 'mb-1' : placeholder === 'Option' ? '' : 'mb-3'
    return (
        <Form.Group className={marginBottom}>
            <Form.Control
                className={`editable-field ${fontSize} ${isEdited ? 'edited' : ''}`}
                isInvalid={!!error}
                onChange={handleChange}
                placeholder={placeholder}
                type="text"
                value={value}
            />
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </Form.Group>
    )
}

export default EditableField
