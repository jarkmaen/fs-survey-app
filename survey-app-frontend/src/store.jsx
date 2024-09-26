import notificationReducer from './reducers/notification'
import surveysReducer from './reducers/surveys'
import userReducer from './reducers/user'
import usersReducer from './reducers/users'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        surveys: surveysReducer,
        user: userReducer,
        users: usersReducer
    }
})

export default store
