import ApiService from './ApiService'


const api = ApiService()
export const getListVideoAPI = (page_number, page_size) => {
    return api.makeRequest({
        url: `/video?page_number=${page_number}&page_size=${page_size}`,
        method: 'GET',
    })
}
export const ShareVideoAPI = (body) => {
    return api.makeAuthRequest({
        url: `/sharevideo`,
        method: 'POST',
        data: body

    })
}