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
const SpaceService_1 = __importDefault(require("../../services/kaiten/space/SpaceService"));
class SpaceController {
    constructor() {
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const spaces = yield this.SpaceService.getSpacesList();
                res.status(200).json(spaces);
            }
            catch (error) {
                res.status(400).send({ error: error.message });
            }
        });
        this.SpaceService = new SpaceService_1.default();
    }
}
exports.default = SpaceController;
