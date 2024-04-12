"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const consts_1 = require("../consts/consts");
const errors_1 = __importDefault(require("../errors"));
const RoleService_1 = __importDefault(require("./RoleService"));
const TokenService_1 = __importDefault(require("./TokenService"));
const UserService_1 = __importDefault(require("./UserService"));
const mapper = __importStar(require("./mapper"));
const bcrypt = __importStar(require("bcryptjs"));
class AuthService {
    constructor() {
        this.UserService = new UserService_1.default();
        this.TokenService = new TokenService_1.default();
        this.RoleService = new RoleService_1.default();
    }
    checkPassword(plainPassword, hashPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const passEqual = yield bcrypt.compare(plainPassword, hashPassword);
            return passEqual;
        });
    }
    register(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidate = yield this.UserService.getByEmail(userData.email);
            if (candidate !== null) {
                throw errors_1.default.BadRequest('User with this email already exists');
            }
            const newUser = yield this.UserService.create(userData);
            const defaultRole = consts_1.dbRoles.USER;
            yield this.RoleService.addRoleToUser({ userId: newUser.id, role: defaultRole });
            yield this.RoleService.addRoleToUser({ userId: newUser.id, role: consts_1.dbRoles.ADMIN });
            const roles = yield this.UserService.getRolesByUserId(newUser.id);
            const tokens = yield this.TokenService.generateTokens({
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                roles: roles,
            });
            yield this.TokenService.createOrUpdate({ userId: newUser.id, token: tokens.refreshToken });
            const data = mapper.toRegisteredUserData(newUser, tokens, roles);
            return { data: data, token: tokens.refreshToken };
        });
    }
    login(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const existsUser = yield this.UserService.getByEmail(userData.email);
            if (existsUser === null) {
                throw errors_1.default.BadRequest('Пользователь не найден');
            }
            const roles = yield this.UserService.getRolesByUserId(existsUser.id);
            const passIsValid = yield this.checkPassword(userData.password, existsUser.password);
            if (!passIsValid) {
                throw errors_1.default.UnautorizedError();
            }
            const tokens = yield this.TokenService.generateTokens({
                id: existsUser.id,
                name: existsUser.name,
                email: existsUser.email,
                roles: roles,
            });
            yield this.TokenService.createOrUpdate({
                userId: existsUser.id,
                token: tokens.refreshToken,
            });
            const data = mapper.toRegisteredUserData(existsUser, tokens, roles);
            return { data: data, token: tokens.refreshToken };
        });
    }
    refresh(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.TokenService.refreshTokens(refreshToken);
            return data;
        });
    }
    logout(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.TokenService.remove(data);
        });
    }
}
exports.default = AuthService;
