import { $api } from '../http'
import { ApiRoutes } from '../consts/apiRoutes'
import { AxiosResponse } from 'axios'
import { BoardResponce } from '../models/responce/BoardResponce'
import { IBoardsDeleteData } from '../models/IBoardDeleteData'

export default class BoardService {
    static async getBoards(spaceId: number): Promise<AxiosResponse<BoardResponce>> {
        return $api.get<BoardResponce>(ApiRoutes.BOARDS + `/${spaceId}`)
    }
    static async deleteBoards(payload: IBoardsDeleteData): Promise<void> {
        const json = JSON.stringify(payload)
        return $api.post(ApiRoutes.BOARDS + `/bulk_delete`, json)
    }
}
