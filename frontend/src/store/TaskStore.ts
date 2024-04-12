import { makeAutoObservable } from 'mobx'
import { ITask } from '../models/ITask'
import TasksService from '../services/TaskService'

export default class TaskStore {
    tasks = {} as ITask[]
    // tasks = [
    //     {
    //         id: 1,
    //         title: 'Загрузка сводки Пискаревский',
    //         toProcess: 87,
    //         processed: 0,
    //         completed: false,
    //     },
    //     {
    //         id: 2,
    //         title: 'Загрузка сводки Колпино',
    //         toProcess: 67,
    //         processed: 0,
    //         completed: false,
    //     },
    //     {
    //         id: 3,
    //         title: 'Загрузка хуй пойми куда',
    //         toProcess: 47,
    //         processed: 0,
    //         completed: false,
    //     },
    // ] as ITask[]

    constructor() {
        makeAutoObservable(this)
    }

    setTasks(tasks: ITask[] | []) {
        this.tasks = tasks
    }
    // inncreaseProgress(id: number) {
    //     const objIndex = this.tasks.findIndex((obj) => obj.id === id)
    //     if (this.tasks[objIndex].processed < this.tasks[objIndex].toProcess) {
    //         this.tasks[objIndex].processed = this.tasks[objIndex].processed + 1
    //     } else {
    //         this.removeTask(id)
    //     }
    // }

    // removeTask(id: number) {
    //     const objIndex = this.tasks.findIndex((obj) => obj.id === id)
    //     if (this.tasks.length > 1) {
    //         this.tasks.splice(objIndex, objIndex)
    //     } else {
    //         this.tasks = []
    //     }
    // }

    // fetchTasks() {
    //     this.tasks.map((task) => {
    //         this.inncreaseProgress(task.id)
    //     })
    //     // console.log(this.tasks)
    //     return this.tasks
    // }
    async fetchTasks(userId: number) {
        try {
            const response = await TasksService.getTasks(userId)
            // console.log(response)
            this.setTasks(response.data.tasks)
        } catch (error: any) {
            console.log(error.response?.data?.message)
        }
    }
}
