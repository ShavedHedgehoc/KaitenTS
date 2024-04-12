"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toTasksList = exports.toRolesList = exports.toRegisteredUserData = void 0;
const toRegisteredUserData = (user, tokens, roles) => {
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            roles: roles,
        },
        token: tokens.accessToken,
    };
};
exports.toRegisteredUserData = toRegisteredUserData;
const toRolesList = (user) => {
    const roles = [];
    user.roles.map((item) => {
        roles.push(item.role);
    });
    return roles;
};
exports.toRolesList = toRolesList;
// Tasks
const toTasksList = (tasks) => {
    return { tasks: tasks };
};
exports.toTasksList = toTasksList;
