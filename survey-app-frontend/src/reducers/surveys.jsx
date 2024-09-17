import surveysService from '../services/surveys'
import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'surveys',
    initialState: [],
    reducers: {
        set(state, { payload }) {
            return payload
        }
    }
})

const { set } = slice.actions

export const initSurveys = () => {
    return async dispatch => {
        const data = await surveysService.getAll()
        dispatch(set(data))
    }
}

export default slice.reducer