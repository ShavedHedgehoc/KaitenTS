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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Token_1 = __importDefault(require("../models/Token"));
const errors_1 = __importDefault(require("../errors"));
class TokenService {
    cleanJWT(token) {
        const cleanToken = Object.assign({}, token);
        delete cleanToken.iat;
        delete cleanToken.exp;
        return cleanToken;
    }
    generateTokens(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessToken = jsonwebtoken_1.default.sign(payload, process.env.ACCESS_TOKEN_SECRET || 'verysecretkey', {
                noTimestamp: true,
                expiresIn: '15m',
            });
            const refreshToken = jsonwebtoken_1.default.sign(payload, process.env.REFRESH_TOKEN_SECRET || 'verysecretkey', {
                noTimestamp: true,
                expiresIn: '30d',
            });
            const tokens = { accessToken: accessToken, refreshToken: refreshToken };
            return tokens;
        });
    }
    verifyToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = yield jsonwebtoken_1.default.verify(token, 'verysecretkey');
            return this.cleanJWT(userData);
        });
    }
    refreshTokens(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = yield this.verifyToken(refreshToken);
            const tokenFromDb = yield Token_1.default.findOne({ where: { token: refreshToken } });
            if (tokenFromDb === null) {
                throw errors_1.default.UnautorizedError();
            }
            const tokens = yield this.generateTokens(userData);
            yield this.createOrUpdate({ userId: userData.id, token: tokens.refreshToken });
            const result = {
                data: {
                    user: userData,
                    token: tokens.accessToken,
                },
                token: tokens.refreshToken,
            };
            return result;
        });
    }
    createOrUpdate(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield Token_1.default.findOne({ where: { userId: payload.userId } });
            if (token) {
                token.token = payload.token;
                yield token.save();
                return token;
            }
            const newToken = yield Token_1.default.create(payload);
            return newToken;
        });
    }
    remove(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Token_1.default.destroy({ where: { token: payload } });
        });
    }
}
exports.default = TokenService;
