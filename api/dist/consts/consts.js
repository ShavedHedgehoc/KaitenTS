"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kaitenCardProperties = exports.kaitenBoardLanes = exports.kaitenBoardColumns = exports.kaitenRoutes = exports.dbRoles = void 0;
var dbRoles;
(function (dbRoles) {
    dbRoles["ADMIN"] = "admin";
    dbRoles["USER"] = "user";
    dbRoles["SPECIALIST"] = "specialist";
})(dbRoles || (exports.dbRoles = dbRoles = {}));
var kaitenRoutes;
(function (kaitenRoutes) {
    kaitenRoutes["SPACES"] = "spaces";
    kaitenRoutes["BOARDS"] = "boards";
    kaitenRoutes["CARDS"] = "cards";
})(kaitenRoutes || (exports.kaitenRoutes = kaitenRoutes = {}));
exports.kaitenBoardColumns = [
    {
        title: 'Заказ на производство',
        sort_order: 1,
        col_count: 1,
        type: 1,
        column_id: 'null',
        external_id: 'null',
        rules: 0,
        pause_sla: 'false',
    },
    {
        title: 'Варка продукта',
        sort_order: 1,
        col_count: 1,
        type: 2,
        column_id: 'null',
        external_id: 'null',
        rules: 0,
        pause_sla: 'false',
    },
    {
        title: 'Готовность продукта',
        sort_order: 1,
        col_count: 1,
        type: 2,
        column_id: 'null',
        external_id: 'null',
        rules: 0,
        pause_sla: 'false',
    },
    {
        title: 'Подключение линии',
        sort_order: 1,
        col_count: 1,
        type: 2,
        column_id: 'null',
        external_id: 'null',
        rules: 0,
        pause_sla: 'false',
    },
    {
        title: 'Контрольный образец ОТК',
        sort_order: 1,
        col_count: 1,
        type: 2,
        column_id: 'null',
        external_id: 'null',
        rules: 0,
        pause_sla: 'false',
    },
    {
        title: 'Допуск на фасовку',
        sort_order: 1,
        col_count: 1,
        type: 2,
        column_id: 'null',
        external_id: 'null',
        rules: 0,
        pause_sla: 'false',
    },
    {
        title: 'Выпуск продукции',
        sort_order: 1,
        col_count: 1,
        type: 3,
        column_id: 'null',
        external_id: 'null',
        rules: 0,
        pause_sla: 'false',
    },
];
exports.kaitenBoardLanes = [{ title: 'Процесс', sort_order: 1, condition: 1 }];
exports.kaitenCardProperties = {
    type: '304127',
    apparatus: 'id_305880',
    marking: 'id_305877',
    bbf: 'id_305883',
    can: 'id_305881',
    conveyor: 'id_305882',
    batch: 'id_305878',
    plan: 'id_305879',
    note: 'id_305884',
    serie: 'id_305876',
};
