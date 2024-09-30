import { Form } from 'react-bootstrap'
import { useState } from 'react'

const EditableField = ({ placeholder, setValue, value }) => {
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
                onChange={handleChange}
                placeholder={placeholder}
                type="text"
                value={value}
            />
        </Form.Group>
    )
}

export default EditableField
