import { makeAutoObservable } from 'mobx'
import { IUser } from '../models/IUser'
import AuthService from '../services/AuthService'

export default class AuthStore {
    user = {} as IUser
    isAuth = false
    pending = false

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool: boolean) {
        this.isAuth = bool
    }

    setUser(user: IUser) {
        this.user = user
    }

    setPending(bool: boolean) {
        this.pending = bool
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password)
            console.log(response)
            localStorage.setItem('token', response.data.token)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (error: any) {
            console.log(error.response?.data?.message)
        }
    }
    async register(name: string, email: string, password: string) {
        try {
            const response = await AuthService.register(name, email, password)
            console.log(response)
            localStorage.setItem('token', response.data.token)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (error: any) {
            console.log(error.response?.data?.message)
        }
    }
    async logout() {
        try {
            const response = await AuthService.logout()
            console.log(response)
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({} as IUser)
        } catch (error: any) {
            console.log(error.response?.data?.message)
        }
    }

    async checkAuth() {
        this.setPending(true)
        try {
            const response = await AuthService.check()
            console.log(response)
            localStorage.setItem('token', response.data.token)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (error: any) {
            console.log(error.response?.data?.message)
        } finally {
            this.setPending(false)
        }
    }
}
