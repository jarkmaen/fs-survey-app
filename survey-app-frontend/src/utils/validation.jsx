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
