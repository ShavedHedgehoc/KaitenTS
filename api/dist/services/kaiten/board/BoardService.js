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
const consts_1 = require("../../../consts/consts");
const http_1 = require("../../../http");
const TaskService_1 = __importDefault(require("../../TaskService"));
const mapper = __importStar(require("./mapper"));
class BoardService {
    constructor() {
        this.TaskService = new TaskService_1.default();
        this.createUrl = (spaceId) => {
            return consts_1.kaitenRoutes.SPACES + '/' + spaceId.toString() + '/' + consts_1.kaitenRoutes.BOARDS;
        };
    }
    createBoard(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.createUrl(payload.spaceId);
            const data = JSON.stringify({
                title: payload.title,
                columns: consts_1.kaitenBoardColumns,
                lanes: consts_1.kaitenBoardLanes,
            });
            const serverResponse = yield http_1.$kaitenApi.post(url, data);
            return mapper.toBoard(serverResponse.data);
        });
    }
    getBoards(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.createUrl(id);
            const serverResponse = yield http_1.$kaitenApi.get(url);
            return mapper.toBoardsList(serverResponse.data);
        });
    }
    deleteBoard(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.createUrl(payload.spaceId) + '/' + payload.boardId.toString();
            const options = JSON.stringify({ force: true });
            const serverResponse = yield (0, http_1.$kaitenApi)({ method: 'DELETE', url: url, data: options });
            return mapper.toDeletedBoardId(serverResponse.data);
        });
    }
    bulkDeleteBoards(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addBoardsDeleteTaskPayload = {
                    userId: payload.userId,
                    title: `Удаление сводок`,
                    toProcess: payload.boards.length,
                };
                const addBoardsDeleteTask = yield this.TaskService.createTask(addBoardsDeleteTaskPayload);
                payload.boards.forEach((board) => __awaiter(this, void 0, void 0, function* () {
                    const boardPayload = {
                        spaceId: payload.spaceId,
                        boardId: board,
                    };
                    console.log(boardPayload);
                    yield this.deleteBoard(boardPayload);
                    yield this.TaskService.updateTaskProgress({ id: addBoardsDeleteTask.id });
                }));
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = BoardService;
