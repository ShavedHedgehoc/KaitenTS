"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TaskController_1 = __importDefault(require("../controllers/TaskController"));
const router = express_1.default.Router();
const controller = new TaskController_1.default();
router.get('/:userId', controller.get);
router.post('/', controller.post);
// router.get('/', [authMiddleware, roleMiddleware([dbRoles.ADMIN, dbRoles.SPECIALIST])], controller.get)
router.put('/', controller.put);
router.delete('/', controller.delete);
// router.get('/', controller.get)
exports.default = router;
