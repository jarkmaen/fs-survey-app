import { QuestionType } from '../constants/enums'

const NAME_MAX_LENGTH = 50
const PASSWORD_MAX_LENGTH = 64
const PASSWORD_MIN_LENGTH = 8
const USERNAME_MAX_LENGTH = 32
const USERNAME_MIN_LENGTH = 3

const DESCRIPTION_MAX_LENGTH = 5000
const OPTION_MAX_LENGTH = 250
const QUESTION_MAX_LENGTH = 250
const TITLE_MAX_LENGTH = 250

const setError = (errors, field, message) => {
    const keys = field.split('.')
    let current = errors
    keys.forEach((key, index) => {
        if (index === keys.length - 1) {
            current[key] = message
        } else {
            current[key] = current[key] || {}
            current = current[key]
        }
    })
}

export const loginFormValidation = ({ username, password }) => {
    const errors = {}
    if (!username.trim()) {
        errors.username = 'Please enter your username.'
    }
    if (!password.trim()) {
        errors.password = 'Please enter your password.'
    }
    return errors
}

export const registerFormValidation = ({ name, username, password }) => {
    const errors = {}
    if (!name.trim().includes(' ')) {
        errors.name = 'Name must be a full name (first and last name).'
    } else if (name.length > NAME_MAX_LENGTH) {
        errors.name = `Name cannot exceed ${NAME_MAX_LENGTH} characters.`
    }
    if (username.length < USERNAME_MIN_LENGTH) {
        errors.username = `Username must be at least ${USERNAME_MIN_LENGTH} characters long.`
    } else if (username.length > USERNAME_MAX_LENGTH) {
        errors.username = `Username cannot exceed ${USERNAME_MAX_LENGTH} characters.`
    }
    if (password.length < PASSWORD_MIN_LENGTH) {
        errors.password = `Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`
    } else if (password.length > PASSWORD_MAX_LENGTH) {
        errors.password = `Password cannot exceed ${PASSWORD_MAX_LENGTH} characters.`
    }
    return errors
}

export const surveyFormValidation = ({ title, description, questions }) => {
    const errors = {}
    if (!title.trim()) {
        setError(errors, 'title', 'Your survey needs a name.')
    } else if (title.length > TITLE_MAX_LENGTH) {
        setError(errors, 'title', `Title cannot exceed ${TITLE_MAX_LENGTH} characters.`)
    }
    if (!description.trim()) {
        setError(errors, 'description', 'Your survey needs a description.')
    } else if (description.length > DESCRIPTION_MAX_LENGTH) {
        setError(errors, 'description', `Description cannot exceed ${DESCRIPTION_MAX_LENGTH} characters.`)
    }
    if (questions.length === 0) {
        setError(errors, 'questions', 'Your survey needs at least one question.')
    } else {
        questions.forEach((q, qIdx) => {
            if (!q.question.trim()) {
                setError(errors, `questions.${qIdx}.text`, 'Question cannot be empty.')
            } else if (q.question.length > QUESTION_MAX_LENGTH) {
                setError(errors, `questions.${qIdx}.text`, `Question cannot exceed ${QUESTION_MAX_LENGTH} characters.`)
            }
            if (q.type !== QuestionType.COMMENT_BOX && (!q.options || q.options.length === 0)) {
                setError(errors, `questions.${qIdx}.options`, 'Your question must have at least one option.')
            } else if (q.options && q.options.length > 0) {
                q.options.forEach((option, oIdx) => {
                    if (!option.trim()) {
                        setError(errors, `questions.${qIdx}.options.${oIdx}.text`, 'Option cannot be empty.')
                    } else if (option.length > OPTION_MAX_LENGTH) {
                        setError(
                            errors,
                            `questions.${qIdx}.options.${oIdx}.text`,
                            `Option cannot exceed ${OPTION_MAX_LENGTH} characters.`
                        )
                    }
                })
            }
        })
    }
    return errors
}

export const surveyResponseValidation = ({ questions, response }) => {
    const errors = {}
    questions.forEach((question) => {
        const answer = response[question.id]
        if (!answer || (Array.isArray(answer) && answer.length === 0)) {
            errors[question.id] = 'Please provide an answer'
        }
    })
    return errors
}
