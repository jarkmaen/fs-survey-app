import axios from 'axios'
import storageService from '../services/storage'

const baseUrl = '/api/responses'

const headers = {
    Authorization: storageService.loadUser()
        ? `Bearer ${storageService.loadUser().token}`
        : null
}

const create = async (responseData) => {
    const response = await axios.post(baseUrl, responseData, { headers })
    return response.data
}

export default { create }