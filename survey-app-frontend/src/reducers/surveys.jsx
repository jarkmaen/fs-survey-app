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
        },
        alter(state, { payload }) {
            return state.map((s) => (s.id !== payload.id ? s : payload))
        }
    }
})

const { set, add, alter } = slice.actions

export const addSurvey = (survey) => {
    return async (dispatch) => {
        const data = await surveysService.create(survey)
        dispatch(add(data))
    }
}

export const initSurveys = () => {
    return async (dispatch) => {
        const data = await surveysService.getAll()
        dispatch(set(data))
    }
}

export const respondSurvey = (id, response) => {
    return async (dispatch) => {
        const formattedResponse = {
            questions: Object.entries(response).map(([id, response]) => ({ id, response }))
        }
        const data = await surveysService.respond(id, formattedResponse)
        dispatch(alter(data))
    }
}

export default slice.reducer
