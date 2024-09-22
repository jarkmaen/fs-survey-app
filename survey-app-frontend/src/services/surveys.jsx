import axios from 'axios'
import storageService from '../services/storage'

const baseUrl = '/api/surveys'

const headers = {
    Authorization: storageService.loadUser() ? `Bearer ${storageService.loadUser().token}` : null
}

const create = async (surveyData) => {
    const request = await axios.post(baseUrl, surveyData)
    return request.data
}

const getAll = async () => {
    const request = await axios.get(baseUrl)
    return request.data
}

const respond = async (id, response) => {
    const request = await axios.post(`${baseUrl}/${id}/responses`, response, { headers })
    return request.data
}

export default { create, getAll, respond }
