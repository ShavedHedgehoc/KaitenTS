"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDeletedBoardId = exports.toBoardsList = exports.toBoard = void 0;
const toBoard = (data) => {
    return { id: data.id, title: data.title, firstColumnId: data.columns[0].id };
};
exports.toBoard = toBoard;
const toBoardsList = (data) => {
    const boards = [];
    data.map((item) => {
        boards.push({ id: item.id, title: item.title });
    });
    return { boards };
};
exports.toBoardsList = toBoardsList;
const toDeletedBoardId = (data) => {
    return { id: data.id };
};
exports.toDeletedBoardId = toDeletedBoardId;
