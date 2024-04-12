import axios from 'axios'
import { ApiRoutes } from '../consts/apiRoutes'

export const apiUrl = '/api/v1'

const $api = axios.create({
    withCredentials: true,
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'multipart/form-data',
    },
})

const $clearApi = axios.create({
    withCredentials: true,
    baseURL: apiUrl,
})

$clearApi.interceptors.request.use(
    function (config) {
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

$api.interceptors.request.use(
    function (config) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

$api.interceptors.response.use(
    function (config) {
        return config
    },
    async function (error) {
        const originalRequest = error.config
        if (originalRequest.url !== ApiRoutes.LOGIN && originalRequest.url !== ApiRoutes.LOGOUT && error.response) {
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true
                try {
                    console.log('refresh from interceptor')
                    const response = await $clearApi.post(ApiRoutes.REFRESH)
                    localStorage.setItem('token', response.data.token)

                    return $api.request(originalRequest)
                } catch (error) {
                    return Promise.reject(error)
                }
            }
        }
        return Promise.reject(error)
    }
)

export { $api, $clearApi }
