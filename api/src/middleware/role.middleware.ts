import { Request, Response, NextFunction } from 'express'
import { CustomRequest } from './auth.middleware'
import ApiError from '../errors'
import UserService from '../services/UserService'

function arrIntersection(arr1: Array<String>, arr2: Array<String>) {
    const setA = new Set(arr1)
    const setB = new Set(arr2)

    let intersectionResult = []

    for (let i of setB) {
        if (setA.has(i)) {
            intersectionResult.push(i)
        }
    }

    return intersectionResult.length > 0
}

export function roleMiddleware(roles: Array<string>) {
    return async function (req: Request, res: Response, next: NextFunction) {
        const userService = new UserService()

        try {
            const userData = (req as CustomRequest).user
            if (!userData) {
                return next(ApiError.UnautorizedError())
            }
            const user = await userService.getById(userData.id)
            if (!user) {
                return next(ApiError.UnautorizedError())
            }
            const userRoles = await userService.getRolesByUserId(userData.id)
            if (userRoles.length === 0) {
                return next(ApiError.ForbiddenError())
            }
            const hasAccess = arrIntersection(roles, userRoles)
            if (!hasAccess) {
                return next(ApiError.ForbiddenError())
            }
            next()
        } catch (error) {
            return next(ApiError.UnautorizedError())
        }
    }
}
