import surveysService from '../services/surveys'
import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'surveys',
    initialState: [],
    reducers: {
        set(state, { payload }) {
            return payload
        },
        add(state, { payload }) {
            return state.concat(payload)
        }
    }
})

const { set, add } = slice.actions

export const initSurveys = () => {
    return async dispatch => {
        const data = await surveysService.getAll()
        dispatch(set(data))
    }
}

export const addSurvey = (survey) => {
    return async dispatch => {
        const data = await surveysService.create(survey)
        dispatch(add(data))
    }
}

export default slice.reducer