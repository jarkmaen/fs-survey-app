import axios from 'axios'

const baseUrl = '/api/users'

const getAll = async () => {
    const request = await axios.get(baseUrl)
    return request.data
}

const register = async (userData) => {
    const response = await axios.post(baseUrl, userData)
    return response.data
}

export default { getAll, register }