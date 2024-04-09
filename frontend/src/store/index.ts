import AuthStore from './AuthStore'
import SummaryStore from './SummaryStore'
import TaskStore from './TaskStore'

export default class RootStore {
    AuthStore
    TaskStore
    SummaryStore
    constructor() {
        this.AuthStore = new AuthStore()
        this.TaskStore = new TaskStore()
        this.SummaryStore = new SummaryStore()
    }
}
