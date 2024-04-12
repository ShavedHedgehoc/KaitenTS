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
const Role_1 = __importDefault(require("../models/Role"));
const UserRoles_1 = __importDefault(require("../models/UserRoles"));
class RoleService {
    getByName(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield Role_1.default.findOne({ where: { name: payload.name } });
            return role;
        });
    }
    addRoleToUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const [role, __] = yield Role_1.default.findOrCreate({ where: { role: payload.role } });
            const [newRoleRecord, _] = yield UserRoles_1.default.findOrCreate({
                where: { userId: payload.userId, roleId: role.id },
            });
        });
    }
}
exports.default = RoleService;
