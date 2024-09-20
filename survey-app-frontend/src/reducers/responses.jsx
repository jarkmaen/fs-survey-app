import responsesService from '../services/responses'
import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'responses',
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

export const addResponse = (responseData, survey) => {
    return async dispatch => {
        const formattedResponse = Object.keys(responseData).map(qIdx => {
            const question = survey.questions[qIdx]
            const answer = responseData[qIdx]
            if (answer.oIdx !== undefined) {
                return {
                    questionId: question._id,
                    optionId: question.options[answer.oIdx]._id
                }
            } else {
                return {
                    questionId: question._id,
                    otherText: answer.text
                }
            }
        })
        const response = await responsesService.create({
            surveyId: survey._id,
            response: formattedResponse
        })
        dispatch(add(response))
    }
}

export default slice.reducer