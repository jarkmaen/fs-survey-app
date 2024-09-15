const STORAGE_KEY = 'surveyAppUser'

const saveUser = (user) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

const loadUser = () => {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY))
}

const removeUser = () => {
    localStorage.removeItem(STORAGE_KEY)
}

export default {
    saveUser,
    loadUser,
    removeUser
}