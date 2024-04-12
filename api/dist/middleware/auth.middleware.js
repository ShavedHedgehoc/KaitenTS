"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const errors_1 = __importDefault(require("../errors"));
const TokenService_1 = __importDefault(require("../services/TokenService"));
function authMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const tokenService = new TokenService_1.default();
        try {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader) {
                return next(errors_1.default.UnautorizedError());
            }
            const accessToken = authorizationHeader.split(' ')[1];
            if (!accessToken) {
                return next(errors_1.default.UnautorizedError());
            }
            const userData = yield tokenService.verifyToken(accessToken);
            if (!userData) {
                return next(errors_1.default.UnautorizedError());
            }
            ;
            req.user = userData;
            next();
        }
        catch (error) {
            return next(errors_1.default.UnautorizedError());
        }
    });
}
exports.authMiddleware = authMiddleware;
