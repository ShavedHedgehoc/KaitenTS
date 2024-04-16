import ApiError from '../errors'
import AuthService from '../services/AuthService'
import { RegisteredUser } from '../types'
import { validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'
import { ApiErrorsMsg } from '../consts/apiMessages'

class AuthController {
    private AuthService: AuthService
    private options

    constructor() {
        this.AuthService = new AuthService()
        this.options = {
            httpOnly: true,
            // secure: true,
        }
    }

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = <any>validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Bad credential', errors.array()))
            }
            const payload = req.body
            const result: RegisteredUser = await this.AuthService.register(payload)
            return res.status(201).cookie('refreshToken', result.token, this.options).json(result.data)
        } catch (error: any) {
            next(error)
        }
    }

    refresh = async (req: any, res: any, next: any) => {
        try {
            const payload = req.cookies['refreshToken']
            const result = await this.AuthService.refresh(payload)
            return res.status(200).cookie('refreshToken', result.token, this.options).json(result.data)
        } catch (error: any) {
            next(error)
        }
    }

    login = async (req: any, res: any, next: any) => {
        try {
            const payload = req.body
            if (!payload.email) {
                throw ApiError.BadRequest(ApiErrorsMsg.FIELD_EMAIL_MISSING)
            }
            if (!payload.password) {
                throw ApiError.BadRequest(ApiErrorsMsg.FIELD_PASSWORD_MISSING)
            }
            const result: RegisteredUser = await this.AuthService.login(payload)
            return res.status(201).cookie('refreshToken', result.token, this.options).json(result.data)
        } catch (error: any) {
            next(error)
        }
    }

    logout = async (req: any, res: any, next: any) => {
        try {
            const token = req.cookies['refreshToken']
            if (token) {
                await this.AuthService.logout(token)
                return res.status(200).clearCookie('refreshToken', this.options).json({ msg: 'logout, token removed' })
            }
            return res.status(200).json({ msg: 'logout, token not removed' })
        } catch (error: any) {
            next(error)
        }
    }
}

export default AuthController
