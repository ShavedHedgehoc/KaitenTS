import TaskService, { addTaskPayload } from '../../TaskService'
import BoardService from '../board/BoardService'
import CardService from '../card/CardService'
import { createCardPayload } from '../../../types'

export type ISummary = {
    serie: string
    marking: string
    batch: string
    plan: string
    apparatus: string
    can: string
    conveyor: string
    bbf: string
    note: string
}
export type ISummaryUploadData = {
    userId: number
    spaceId: number
    title: string
    rows: ISummary[]
}
export default class UploadService {
    private BoardService
    private TaskService
    private CardService
    constructor() {
        this.BoardService = new BoardService()
        this.TaskService = new TaskService()
        this.CardService = new CardService()
    }

    async uploadSummary(payload: ISummaryUploadData) {
        try {
            const addBoardTaskPayload: addTaskPayload = {
                userId: payload.userId,
                title: `Создание доски "${payload.title}"`,
                toProcess: 1,
            }
            const addCardsTaskPayload: addTaskPayload = {
                userId: payload.userId,
                title: `Создание карточек на доске "${payload.title}"`,
                toProcess: payload.rows.length,
            }
            const addBoardTask = await this.TaskService.createTask(addBoardTaskPayload)
            const addCardsTask = await this.TaskService.createTask(addCardsTaskPayload)
            const board = await this.BoardService.createBoard({ spaceId: payload.spaceId, title: payload.title })
            await this.TaskService.updateTaskProgress({ id: addBoardTask.id })

            payload.rows.forEach(async (row) => {
                const cardPayload: createCardPayload = {
                    ...row,
                    title: payload.title,
                    boardId: board.id,
                    columnId: board.firstColumnId,
                }
                const card = await this.CardService.createCard(cardPayload)
                const cardResult = await this.TaskService.updateTaskProgress({ id: addCardsTask.id })
                // console.log(cardResult)
            })
        } catch (error) {
            console.log(error)
        }
    }
}
