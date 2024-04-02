"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
class App {
    //   private sequelize:Sequelize
    constructor(port = 5000, host = "localhost") {
        this.port = port;
        this.host = host;
        this.app = this.createApp();
        this.server = this.createServer();
        // this.sequelize = sequelize // from db
    }
    createApp() {
        const app = (0, express_1.default)();
        app.use((0, cors_1.default)());
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
