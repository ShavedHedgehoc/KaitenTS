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
const TaskService_1 = __importDefault(require("../../TaskService"));
const BoardService_1 = __importDefault(require("../board/BoardService"));
const CardService_1 = __importDefault(require("../card/CardService"));
class UploadService {
    constructor() {
        this.BoardService = new BoardService_1.default();
        this.TaskService = new TaskService_1.default();
        this.CardService = new CardService_1.default();
    }
    uploadSummary(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addBoardTaskPayload = {
                    userId: payload.userId,
                    title: `Создание доски "${payload.title}"`,
                    toProcess: 1,
                };
                const addCardsTaskPayload = {
                    userId: payload.userId,
                    title: `Создание карточек на доске "${payload.title}"`,
                    toProcess: payload.rows.length,
                };
                const addBoardTask = yield this.TaskService.createTask(addBoardTaskPayload);
                const addCardsTask = yield this.TaskService.createTask(addCardsTaskPayload);
                const board = yield this.BoardService.createBoard({ spaceId: payload.spaceId, title: payload.title });
                yield this.TaskService.updateTaskProgress({ id: addBoardTask.id });
                payload.rows.forEach((row) => __awaiter(this, void 0, void 0, function* () {
                    const cardPayload = Object.assign(Object.assign({}, row), { title: payload.title, boardId: board.id, columnId: board.firstColumnId });
                    const card = yield this.CardService.createCard(cardPayload);
                    const cardResult = yield this.TaskService.updateTaskProgress({ id: addCardsTask.id });
                    // console.log(cardResult)
                }));
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = UploadService;
