import { initSurveys } from '../reducers/surveys'
import { initUser, clearUser } from '../reducers/user'
import { initUsers } from '../reducers/users'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

export const useInitialization = () => {
    const dispatch = useDispatch()
    return () => {
        dispatch(initSurveys())
        dispatch(initUser())
        dispatch(initUsers())
    }
}

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