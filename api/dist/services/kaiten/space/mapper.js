"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSpacesList = void 0;
const toSpacesList = (data) => {
    const result = [];
    data.map((item) => {
        result.push({ id: item.id, title: item.title });
    });
    return result;
};
exports.toSpacesList = toSpacesList;
