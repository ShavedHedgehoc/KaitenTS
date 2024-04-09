import Task from '../models/Task'
import TaskService, { getTasksByUserIdPayload } from '../services/TaskService'

class TaskController {
    private TaskService: TaskService

    constructor() {
        this.TaskService = new TaskService()
    }

    get = async (req: any, res: any) => {
        try {
            // let payload = {} as getTasksByUserIdPayload
            const payload = parseInt(req.params.userId)
            // console.log(req.query)
            // console.log(req.body)
            // payload.userId = 12
            // console.log(payload)
            const tasks: Task[] = await this.TaskService.getTasksByUserId(payload)

            res.status(201).send(tasks)
        } catch (error: any) {
            res.status(400).send({ error: error.message })
        }
    }

    post = async (req: any, res: any) => {
        try {
            const payload = req.body
            const task: Task = await this.TaskService.createTask(payload)

            res.status(200).send(task)
        } catch (error: any) {
            res.status(400).send({ error: error.message })
        }
    }

    put = async (req: any, res: any) => {
        try {
            const payload = req.body
            const task: Task = await this.TaskService.updateTaskProgress(payload)

            res.status(200).send(task)
        } catch (error: any) {
            res.status(400).send({ error: error.message })
        }
    }
    delete = async (req: any, res: any) => {
        try {
            const payload = req.body
            const result: string = await this.TaskService.deleteTask(payload)

            res.status(200).send(result)
        } catch (error: any) {
            res.status(400).send({ error: error.message })
        }
    }
}

export default TaskController
