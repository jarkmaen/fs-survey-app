import surveysReducer from './reducers/surveys'
import userReducer from './reducers/user'
import usersReducer from './reducers/users'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
        surveys: surveysReducer,
        user: userReducer,
        users: usersReducer
    }
})

export default store
