import storage from './storage'

let token = null

const setUser = (user) => {
    storage.saveUser(user)
    token = user.token
}

const getUser = () => {
    const user = storage.loadUser()
    if (user) {
        token = user.token
        return user
    }
    return null
}

const clearUser = () => {
    storage.removeUser()
    token = null
}

const getToken = () => token

export default {
    setUser,
    getUser,
    clearUser,
    getToken
}
