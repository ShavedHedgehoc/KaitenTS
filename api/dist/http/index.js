"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.$kaitenApi = void 0;
const axios_1 = __importDefault(require("axios"));
const axios_rate_limit_1 = __importDefault(require("axios-rate-limit"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const headers = {
    Authorization: `Bearer ${process.env.KAITEN_TOKEN}`,
    'Content-type': 'application/json; charset=utf-8',
    // 'Access-Control-Allow-Origin': '*',
};
const $kaitenApi = (0, axios_rate_limit_1.default)(axios_1.default.create({
    baseURL: process.env.KAITEN_URL,
    timeout: 1000,
    headers: headers,
}), { maxRequests: 1, perMilliseconds: 1000, maxRPS: 1 });
exports.$kaitenApi = $kaitenApi;
