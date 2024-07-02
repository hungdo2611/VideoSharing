import ApiService from './ApiService'


const api = ApiService()
export const registerAPI = (body) => {
    return api.makeRequest({
        url: `/users/register`,
        method: 'POST',
        data: body
    })
}
export const LoginAPI = (body) => {
    return api.makeAuthRequest({
        url: `/users/login`,
        method: 'POST',
        data: body

    })
}