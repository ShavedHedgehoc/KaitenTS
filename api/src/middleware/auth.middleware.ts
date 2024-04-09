import { Request, Response, NextFunction } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import ApiError from '../errors'
import TokenService from '../services/TokenService'

export interface CustomRequest extends Request {
    user: JwtPayload
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const tokenService = new TokenService()
    try {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader) {
            return next(ApiError.UnautorizedError())
        }
        const accessToken = authorizationHeader.split(' ')[1]
        if (!accessToken) {
            return next(ApiError.UnautorizedError())
        }
        const userData = await tokenService.verifyToken(accessToken)
        if (!userData) {
            return next(ApiError.UnautorizedError())
        }
        ;(req as CustomRequest).user = userData
        next()
    } catch (error) {
        return next(ApiError.UnautorizedError())
    }
}
