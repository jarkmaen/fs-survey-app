import { clearUser, initUser } from '../reducers/user'
import { initSurveys } from '../reducers/surveys'
import { initUsers } from '../reducers/users'
import { notify } from '../reducers/notification'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

export const useClearUser = () => {
    const dispatch = useDispatch()
    return () => {
        dispatch(clearUser())
    }
}

export const useField = (type) => {
    const [value, setValue] = useState('')
    const onChange = (event) => {
        setValue(event.target.value)
    }
    return {
        type,
        value,
        onChange
    }
}

export const useInitialization = () => {
    const dispatch = useDispatch()
    return () => {
        dispatch(initSurveys())
        dispatch(initUser())
        dispatch(initUsers())
    }
}

export const useNotification = () => {
    const dispatch = useDispatch()
    return (message, type = 'info') => {
        dispatch(notify(message, type))
    }
}
