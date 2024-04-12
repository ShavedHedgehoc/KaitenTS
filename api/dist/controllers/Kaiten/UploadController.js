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
const UploadService_1 = __importDefault(require("../../services/kaiten/upload/UploadService"));
class UploadController {
    constructor() {
        this.post = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                this.UploadService.uploadSummary(payload);
                res.status(200).json({ msg: 'Upload success' });
            }
            catch (error) {
                res.status(400).send({ error: error.message });
            }
        });
        this.UploadService = new UploadService_1.default();
    }
}
exports.default = UploadController;
