export type Tokens = {
    accessToken: string
    refreshToken: string
}

export type generateTokensPayload = {
    id: number
    name: string
    email: string
    roles: string[]
}

export type createOrUpdateTokensPayload = {
    userId: number
    token: string
}

export type RegisteredUserData = {
    user: {
        id: number
        name: string
        email: string
        roles: string[]
    }
    token: string
}

// rename to Authtrntificated user
export type RegisteredUser = {
    data: RegisteredUserData
    token: string
}

export type addRoleToUserPayload = {
    role: string
    userId: number
}

//   title: string;
//   board_id: number;
//   column_id: number;
//   asap: boolean;
//   due_date_time_present: boolean;
//   expires_later: false;
//   type_id: string;
//   properties: object;
// };

export type createCardPayload = {
    title: string
    boardId: number
    columnId: number
    apparatus: string
    batch: string
    bbf: string
    can: string
    conveyor: string
    marking: string
    note: string
    plan: string
    serie: string
}

export type createBoardPayload = {
    spaceId: number
    title: string
}

export type getBoardPayload = {
    spaceId: number
}

export type deleteBoardPayload = {
    spaceId: number
    boardId: number
}

export type bulkDeleteBoardsPayload = {
    userId: number
    spaceId: number
    boards: number[]
}
