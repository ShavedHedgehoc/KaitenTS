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
const UserService_1 = __importDefault(require("../services/UserService"));
class UserController {
    constructor() {
        this.post = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                const user = yield this.UserService.create(payload);
                res.status(201).send(user);
            }
            catch (error) {
                res.status(400).send({ error: error.message });
            }
        });
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.UserService.getAllUsers();
                res.status(200).send(users);
            }
            catch (error) {
                res.status(400).send({ error: error.message });
            }
        });
        this.UserService = new UserService_1.default();
    }
}
exports.default = UserController;
