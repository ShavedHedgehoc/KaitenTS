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
const errors_1 = __importDefault(require("../errors"));
const AuthService_1 = __importDefault(require("../services/AuthService"));
const express_validator_1 = require("express-validator");
const apiMessages_1 = require("../consts/apiMessages");
class AuthController {
    constructor() {
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return next(errors_1.default.BadRequest('Bad credential', errors.array()));
                }
                const payload = req.body;
                const result = yield this.AuthService.register(payload);
                return res.status(201).cookie('refreshToken', result.token, this.options).json(result.data);
            }
            catch (error) {
                next(error);
            }
        });
        this.refresh = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.cookies['refreshToken'];
                const result = yield this.AuthService.refresh(payload);
                return res.status(200).cookie('refreshToken', result.token, this.options).json(result.data);
            }
            catch (error) {
                next(error);
            }
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                if (!payload.email) {
                    throw errors_1.default.BadRequest(apiMessages_1.ApiErrorsMsg.FIELD_EMAIL_MISSING);
                }
                if (!payload.password) {
                    throw errors_1.default.BadRequest(apiMessages_1.ApiErrorsMsg.FIELD_PASSWORD_MISSING);
                }
                const result = yield this.AuthService.login(payload);
                return res.status(201).cookie('refreshToken', result.token, this.options).json(result.data);
            }
            catch (error) {
                next(error);
            }
        });
        this.logout = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.cookies['refreshToken'];
                if (token) {
                    yield this.AuthService.logout(token);
                    return res.status(200).clearCookie('refreshToken', this.options).json({ msg: 'logout, token removed' });
                }
                return res.status(200).json({ msg: 'logout, token not removed' });
            }
            catch (error) {
                next(error);
            }
        });
        this.AuthService = new AuthService_1.default();
        this.options = {
            httpOnly: true,
            secure: true,
        };
    }
}
exports.default = AuthController;
