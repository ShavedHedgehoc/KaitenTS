import AuthStore from './AuthStore'
import BoardStore from './BoardStore'
import SummaryStore from './SummaryStore'
import TaskStore from './TaskStore'

export default class RootStore {
    AuthStore
    TaskStore
    SummaryStore
    BoardStore
    constructor() {
        this.AuthStore = new AuthStore()
        this.TaskStore = new TaskStore()
        this.SummaryStore = new SummaryStore()
        this.BoardStore = new BoardStore()
    }
}
