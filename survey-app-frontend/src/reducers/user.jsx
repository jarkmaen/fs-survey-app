import loginService from '../services/login'
import storageService from '../services/storage'
import usersService from '../services/users'
import { createSlice } from '@reduxjs/toolkit'
import { notify } from './notification'

const initialState = null

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        set(state, action) {
            return action.payload
        },
        clear() {
            return initialState
        }
    }
})

export const { set, clear } = slice.actions

export const clearUser = () => {
    return async (dispatch) => {
        storageService.removeUser()
        dispatch(clear())
    }
}

export const initUser = () => {
    return async (dispatch) => {
        const user = storageService.loadUser()
        dispatch(set(user))
    }
}

export const loginUser = (credentials) => {
    return async (dispatch) => {
        try {
            const user = await loginService.login(credentials)
            storageService.saveUser(user)
            dispatch(set(user))
            dispatch(notify('You have successfully logged in!'))
            return { success: true }
        } catch {
            dispatch(notify('Incorrect username or password.', 'danger'))
            return { success: false }
        }
    }
}

export const registerUser = (userData) => {
    return async (dispatch) => {
        try {
            const user = await usersService.register(userData)
            storageService.saveUser(user)
            dispatch(set(user))
            dispatch(notify('Your registration has been successful!'))
            return { success: true }
        } catch (error) {
            const message = error.response?.data?.error || 'Failed to register.'
            dispatch(notify(message, 'danger'))
            return { success: false }
        }
    }
}

export default slice.reducer
