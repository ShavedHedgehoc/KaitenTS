import { makeAutoObservable } from 'mobx'
import { IBoard } from '../models/IBoard'
import BoardService from '../services/BoardService'
import handleError from '../http/handleError'
import { IBoardsDeleteData } from '../models/IBoardDeleteData'

export default class BoardStore {
    boards = {} as IBoard[]
    pending = false
    error = ''
    constructor() {
        makeAutoObservable(this)
    }

    setBoards(boards: IBoard[] | []) {
        this.boards = boards
    }
    setPending(bool: boolean) {
        this.pending = bool
    }

    setError(error: string) {
        this.error = error
    }

    async fetchBoards(spaceId: number) {
        try {
            this.setPending(true)
            this.setError('')
            const responce = await BoardService.getBoards(spaceId)
            this.setBoards(responce.data.boards)
        } catch (error: any) {
            const errValue = handleError(error)
            this.setError(errValue)
            console.log(error.response?.data?.message)
        } finally {
            this.setPending(false)
        }
    }

    async deleteBoard(payload: IBoardsDeleteData) {
        try {
            this.setPending(true)
            this.setError('')
            const responce = await BoardService.deleteBoards(payload)
        } catch (error: any) {
            const errValue = handleError(error)
            this.setError(errValue)
            console.log(error.response?.data?.message)
        } finally {
            this.setPending(false)
            this.fetchBoards(payload.spaceId)
        }
    }
}
