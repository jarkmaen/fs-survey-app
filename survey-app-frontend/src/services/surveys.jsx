import axios from 'axios'
import storageService from '../services/storage'

const baseUrl = '/api/surveys'

const getHeaders = () => {
    const user = storageService.loadUser()
    return {
        Authorization: user ? `Bearer ${user.token}` : null
    }
}

const close = async (id) => {
    const headers = getHeaders()
    const request = await axios.patch(`${baseUrl}/${id}/close`, null, { headers })
    return request.data
}

const create = async (surveyData) => {
    const headers = getHeaders()
    const request = await axios.post(baseUrl, surveyData, { headers })
    return request.data
}

const getAll = async () => {
    const request = await axios.get(baseUrl)
    return request.data
}

const remove = async (id) => {
    const headers = getHeaders()
    await axios.delete(`${baseUrl}/${id}`, { headers })
}

const respond = async (id, response) => {
    const headers = getHeaders()
    const request = await axios.post(`${baseUrl}/${id}/responses`, response, { headers })
    return request.data
}

export default { close, create, getAll, remove, respond }
