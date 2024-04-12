"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
    static ForbiddenError() {
        return new ApiError(403, 'Недостаточно прав для доступа');
    }
    static UnautorizedError() {
        return new ApiError(401, 'Не авторизован');
    }
    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }
}
exports.default = ApiError;
