import { Request, Response, NextFunction } from 'express'
import BoardService from '../../services/kaiten/board/BoardService'
import { bulkDeleteBoardsPayload, createBoardPayload, deleteBoardPayload, getBoardPayload } from '../../types'

class BoardController {
    private BoardService: BoardService

    constructor() {
        this.BoardService = new BoardService()
    }
    get = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const payload = parseInt(req.params.spaceId)
            const boards = await this.BoardService.getBoards(payload)
            return res.status(200).json(boards)
        } catch (error: any) {
            next(error)
        }
    }

    post = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const payload: createBoardPayload = req.body
            const board = await this.BoardService.createBoard(payload)
            return res.status(200).json(board)
        } catch (error: any) {
            next(error)
        }
    }

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const payload: deleteBoardPayload = req.body
            const boardId = await this.BoardService.deleteBoard(payload)
            return res.status(200).json(boardId)
        } catch (error: any) {
            next(error)
        }
    }

    bulkDelete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const payload: bulkDeleteBoardsPayload = req.body
            this.BoardService.bulkDeleteBoards(payload)
            return res.status(200).json({ msg: 'Deletetasks added' })
        } catch (error: any) {
            next(error)
        }
    }
}

export default BoardController
