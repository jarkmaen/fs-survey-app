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
    }
    if (username.length < 3) {
        errors.username = 'Username must be at least 3 characters long.'
    }
    if (password.length < 8) {
        errors.password = 'Password must be at least 8 characters long.'
    }
    return errors
}

export const surveyFormValidation = ({ title, description, questions }) => {
    const errors = {}
    if (!title.trim()) {
        errors.title = 'Your survey needs a name.'
    }
    if (!description.trim()) {
        errors.description = 'Your survey needs a description.'
    }
    if (questions.length === 0) {
        errors.questions = 'Your survey needs at least one question.'
    } else {
        questions.forEach((question, qIdx) => {
            if (!question.question.trim()) {
                if (!errors.questions) errors.questions = {}
                errors.questions[qIdx] = { question: 'Question cannot be empty.' }
            }
            if (question.options && question.options.length > 0) {
                question.options.forEach((option, oIdx) => {
                    if (!option.trim()) {
                        if (!errors.questions) errors.questions = {}
                        if (!errors.questions[qIdx]) errors.questions[qIdx] = {}
                        if (!errors.questions[qIdx].options) errors.questions[qIdx].options = []
                        errors.questions[qIdx].options[oIdx] = 'Option cannot be empty.'
                    }
                })
            }
        })
    }
    return errors
}
