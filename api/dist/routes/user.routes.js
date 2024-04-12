"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const consts_1 = require("../consts/consts");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const router = express_1.default.Router();
const controller = new UserController_1.default();
// router.post('/', controller.post)
router.get('/', [auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)([consts_1.dbRoles.ADMIN, consts_1.dbRoles.USER])], controller.get);
// router.get('/', [checkJwt, checkRole([dbRoles.ADMIN])], controller.get)
// router.get('/', controller.get)
exports.default = router;
