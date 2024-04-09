export enum dbRoles {
    ADMIN = 'admin',
    USER = 'user',
    SPECIALIST = 'specialist',
}

export enum kaitenRoutes {
    SPACES = 'spaces',
    BOARDS = 'boards',
    CARDS = 'cards',
}

export const kaitenBoardColumns = [
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
]

export const kaitenBoardLanes = [{ title: 'Процесс', sort_order: 1, condition: 1 }]

export const kaitenCardProperties = {
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
}
