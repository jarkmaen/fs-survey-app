import userReducer from './reducers/user'
import usersReducer from './reducers/users'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
        user: userReducer,
        users: usersReducer
    }
})

export default store