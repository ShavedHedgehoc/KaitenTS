import BoardService from '../../services/kaiten/board/BoardService'
import { createBoardPayload, deleteBoardPayload, getBoardPayload } from '../../types'

class BoardController {
    private BoardService: BoardService

    constructor() {
        this.BoardService = new BoardService()
    }
    get = async (req: any, res: any) => {
        try {
            const payload: getBoardPayload = req.body
            const boards = await this.BoardService.getBoards(payload)
            res.status(200).json(boards)
        } catch (error: any) {
            res.status(400).send({ error: error })
        }
    }

    post = async (req: any, res: any) => {
        try {
            const payload: createBoardPayload = req.body
            const board = await this.BoardService.createBoard(payload)
            res.status(200).json(board)
        } catch (error: any) {
            res.status(400).send({ error: error })
        }
    }

    delete = async (req: any, res: any) => {
        try {
            const payload: deleteBoardPayload = req.body
            const boardId = await this.BoardService.deleteBoard(payload)
            res.status(200).json(boardId)
        } catch (error: any) {
            res.status(400).send({ error: error })
        }
    }
}

export default BoardController
