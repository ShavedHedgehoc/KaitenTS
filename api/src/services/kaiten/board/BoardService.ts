import { kaitenBoardColumns, kaitenBoardLanes, kaitenRoutes } from '../../../consts/consts'
import { $kaitenApi } from '../../../http'
import { createBoardPayload, deleteBoardPayload, getBoardPayload } from '../../../types'
import TaskService, { addTaskPayload } from '../../TaskService'
import * as mapper from './mapper'

export default class BoardService {
    private createUrl
    private TaskService
    constructor() {
        this.TaskService = new TaskService()
        this.createUrl = (spaceId: number) => {
            return kaitenRoutes.SPACES + '/' + spaceId.toString() + '/' + kaitenRoutes.BOARDS
        }
    }

    async createBoard(payload: createBoardPayload) {
        const url = this.createUrl(payload.spaceId)
        const data = JSON.stringify({
            title: payload.title,
            columns: kaitenBoardColumns,
            lanes: kaitenBoardLanes,
        })

        const serverResponse = await $kaitenApi.post(url, data)
        return mapper.toBoard(serverResponse.data)
    }

    async getBoards(payload: getBoardPayload) {
        const url = this.createUrl(payload.spaceId)
        const serverResponse = await $kaitenApi.get(url)
        return mapper.toBoardsList(serverResponse.data)
    }

    async deleteBoard(payload: deleteBoardPayload) {
        const url = this.createUrl(payload.spaceId) + '/' + payload.boardId.toString()
        const options = JSON.stringify({ force: true })
        const serverResponse = await $kaitenApi({ method: 'DELETE', url: url, data: options })
        return mapper.toDeletedBoardId(serverResponse.data)
    }
}
