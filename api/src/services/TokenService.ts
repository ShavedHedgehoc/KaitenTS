import jwt from 'jsonwebtoken'
import { RegisteredUser, Tokens, createOrUpdateTokensPayload, generateTokensPayload } from '../types'

import Token from '../models/Token'
import ApiError from '../errors'

export default class TokenService {
    private cleanJWT(token: any) {
        const cleanToken = { ...token }
        delete cleanToken.iat
        delete cleanToken.exp
        return cleanToken
    }

    async generateTokens(payload: generateTokensPayload): Promise<Tokens> {
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET || 'verysecretkey', {
            noTimestamp: true,
            expiresIn: '15m',
        })
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET || 'verysecretkey', {
            noTimestamp: true,
            expiresIn: '30d',
        })
        const tokens = { accessToken: accessToken, refreshToken: refreshToken }
        return tokens
    }

    async verifyToken(token: string) {
        const userData = await jwt.verify(token, 'verysecretkey')
        return this.cleanJWT(userData)
    }

    async refreshTokens(refreshToken: string): Promise<RegisteredUser> {
        const userData: any = await this.verifyToken(refreshToken)
        const tokenFromDb = await Token.findOne({ where: { token: refreshToken } })
        if (tokenFromDb === null) {
            throw ApiError.UnautorizedError()
        }
        const tokens = await this.generateTokens(userData)
        await this.createOrUpdate({ userId: userData.id, token: tokens.refreshToken })
        const result: RegisteredUser = {
            data: {
                user: userData,
                token: tokens.accessToken,
            },
            token: tokens.refreshToken,
        }
        return result
    }

    async createOrUpdate(payload: createOrUpdateTokensPayload): Promise<any> {
        const token = await Token.findOne({ where: { userId: payload.userId } })
        if (token) {
            token.token = payload.token
            await token.save()
            return token
        }
        const newToken = await Token.create(payload)
        return newToken
    }

    async remove(payload: string): Promise<any> {
        return await Token.destroy({ where: { token: payload } })
    }
}
