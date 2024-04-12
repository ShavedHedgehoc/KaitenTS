export default class ApiError extends Error {
    status: any
    errors: any

    constructor(status: number, message: string, errors = []) {
        super(message)
        this.status = status
        this.errors = errors
    }

    static ForbiddenError() {
        return new ApiError(403, 'Недостаточно прав для доступа')
    }

    static UnautorizedError() {
        return new ApiError(401, 'Не авторизован')
    }

    static BadRequest(message: string, errors = []) {
        return new ApiError(400, message, errors)
    }
}
