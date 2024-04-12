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
const BoardService_1 = __importDefault(require("../../services/kaiten/board/BoardService"));
class BoardController {
    constructor() {
        this.get = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = parseInt(req.params.spaceId);
                const boards = yield this.BoardService.getBoards(payload);
                return res.status(200).json(boards);
            }
            catch (error) {
                next(error);
            }
        });
        this.post = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                const board = yield this.BoardService.createBoard(payload);
                return res.status(200).json(board);
            }
            catch (error) {
                next(error);
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                const boardId = yield this.BoardService.deleteBoard(payload);
                return res.status(200).json(boardId);
            }
            catch (error) {
                next(error);
            }
        });
        this.bulkDelete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                this.BoardService.bulkDeleteBoards(payload);
                return res.status(200).json({ msg: 'Deletetasks added' });
            }
            catch (error) {
                next(error);
            }
        });
        this.BoardService = new BoardService_1.default();
    }
}
exports.default = BoardController;
