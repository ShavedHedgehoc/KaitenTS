import { $api, $clearApi } from '../http'
import { ApiRoutes } from '../consts/apiRoutes'
import { AxiosResponse } from 'axios'
import { AuthResponce } from '../models/responce/AuthResponce'

export default class AuthService {
    static async register(name: string, email: string, password: string): Promise<AxiosResponse<AuthResponce>> {
        return $api.post<AuthResponce>(ApiRoutes.REGISTER, { name, email, password })
    }
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponce>> {
        return $api.post<AuthResponce>(ApiRoutes.LOGIN, { email, password })
    }
    static async logout(): Promise<void> {
        return $api.post(ApiRoutes.LOGOUT)
    }
    static async refresh() {
        return $api.post(ApiRoutes.REFRESH)
    }
    static async check() {
        return $clearApi.post(ApiRoutes.REFRESH)
    }
}
