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
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = __importDefault(require("../models/User"));
const Role_1 = __importDefault(require("../models/Role"));
const Token_1 = __importDefault(require("../models/Token"));
const UserRoles_1 = __importDefault(require("../models/UserRoles"));
const Task_1 = __importDefault(require("../models/Task"));
const dbDialect = (process.env.DB_DRIVER || 'sqlite');
const dbStorage = process.env.DB_STORAGE || 'db.dev.sqlite';
const sequelize = new sequelize_typescript_1.Sequelize({
    dialect: dbDialect,
    storage: dbStorage,
});
const models = [User_1.default, Role_1.default, UserRoles_1.default, Token_1.default, Task_1.default];
sequelize.addModels(models);
sequelize
    .sync()
    .then(() => console.log('sync models...'))
    .catch((e) => console.log(e));
function testConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sequelize.authenticate();
            console.log('Connection succesfully established');
        }
        catch (error) {
            console.log(error);
        }
    });
}
testConnection();
exports.default = sequelize;
