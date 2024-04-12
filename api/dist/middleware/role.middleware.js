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
exports.roleMiddleware = void 0;
const errors_1 = __importDefault(require("../errors"));
const UserService_1 = __importDefault(require("../services/UserService"));
function arrIntersection(arr1, arr2) {
    const setA = new Set(arr1);
    const setB = new Set(arr2);
    let intersectionResult = [];
    for (let i of setB) {
        if (setA.has(i)) {
            intersectionResult.push(i);
        }
    }
    return intersectionResult.length > 0;
}
function roleMiddleware(roles) {
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userService = new UserService_1.default();
            try {
                const userData = req.user;
                if (!userData) {
                    return next(errors_1.default.UnautorizedError());
                }
                const user = yield userService.getById(userData.id);
                if (!user) {
                    return next(errors_1.default.UnautorizedError());
                }
                const userRoles = yield userService.getRolesByUserId(userData.id);
                if (userRoles.length === 0) {
                    return next(errors_1.default.ForbiddenError());
                }
                const hasAccess = arrIntersection(roles, userRoles);
                if (!hasAccess) {
                    return next(errors_1.default.ForbiddenError());
                }
                next();
            }
            catch (error) {
                return next(errors_1.default.UnautorizedError());
            }
        });
    };
}
exports.roleMiddleware = roleMiddleware;
