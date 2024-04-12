"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Authcontroller_1 = __importDefault(require("../controllers/Authcontroller"));
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
const controller = new Authcontroller_1.default();
router.post('/register', [(0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('email', 'empty email').not().isEmpty()], controller.register);
router.post('/login', controller.login);
router.post('/logout', controller.logout);
router.post('/refresh', controller.refresh);
exports.default = router;
