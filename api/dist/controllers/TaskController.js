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
const TaskService_1 = __importDefault(require("../services/TaskService"));
class TaskController {
    constructor() {
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // let payload = {} as getTasksByUserIdPayload
                const payload = parseInt(req.params.userId);
                // console.log(req.query)
                // console.log(req.body)
                // payload.userId = 12
                // console.log(payload)
                const tasks = yield this.TaskService.getTasksByUserId(payload);
                res.status(201).send(tasks);
            }
            catch (error) {
                res.status(400).send({ error: error.message });
            }
        });
        this.post = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                const task = yield this.TaskService.createTask(payload);
                res.status(200).send(task);
            }
            catch (error) {
                res.status(400).send({ error: error.message });
            }
        });
        this.put = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                const task = yield this.TaskService.updateTaskProgress(payload);
                res.status(200).send(task);
            }
            catch (error) {
                res.status(400).send({ error: error.message });
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                const result = yield this.TaskService.deleteTask(payload);
                res.status(200).send(result);
            }
            catch (error) {
                res.status(400).send({ error: error.message });
            }
        });
        this.TaskService = new TaskService_1.default();
    }
}
exports.default = TaskController;
