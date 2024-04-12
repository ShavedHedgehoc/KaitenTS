"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import cors from 'cors'
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = require("http");
const db_1 = __importDefault(require("../db/db"));
const index_1 = __importDefault(require("../routes/index"));
const errors_middleware_1 = __importDefault(require("../middleware/errors.middleware"));
dotenv_1.default.config();
class App {
    constructor(port = 5000, host = 'localhost') {
        this.port = port;
        this.host = host;
        this.app = this.createApp();
        this.server = this.createServer();
        this.sequelize = db_1.default;
    }
    createApp() {
        const app = (0, express_1.default)();
        // app.use(cors())
        app.use(express_1.default.urlencoded({ extended: true, limit: '1mb' }));
        app.use(express_1.default.json());
        app.use((0, cookie_parser_1.default)());
        app.use('/api/v1', index_1.default);
        app.use(errors_middleware_1.default);
        return app;
    }
    createServer() {
        const server = (0, http_1.createServer)(this.app);
        return server;
    }
    start() {
        this.app.listen(this.port, () => {
            console.log(`Running on port ${this.port}`);
        });
    }
}
exports.default = App;
