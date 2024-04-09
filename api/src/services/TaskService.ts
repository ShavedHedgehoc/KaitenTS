import ApiError from '../errors'
import Task from '../models/Task'
import * as mapper from './mapper'

export type addTaskPayload = {
    userId: number
    title: string
    toProcess: number
}

export type updateTaskProgressPayload = {
    id: number
}

export type deleteTaskPayload = {
    id: number
}

export type getTasksByUserIdPayload = {
    userId: number
}

export default class TaskService {
    async createTask(payload: addTaskPayload): Promise<Task> {
        const task = await Task.create(payload)
        return task
    }

    async updateTaskProgress(payload: updateTaskProgressPayload): Promise<Task> {
        const task: Task | null = await Task.findOne({ where: payload })
        if (task === null) {
            throw ApiError.BadRequest('Task not found')
        }
        if (task.processed >= task.toProcess) {
            throw ApiError.BadRequest('All rows already processed')
        }
        task.processed = task.processed + 1
        await task.save()
        return task
    }

    async getTasksByUserId(id: number): Promise<any> {
        if (id === undefined) {
            throw ApiError.BadRequest('User id not provided')
        }
        const tasks = await Task.findAll({ where: { userId: id, completed: false } })
        return mapper.toTasksList(tasks)
    }

    async deleteTask(payload: deleteTaskPayload): Promise<any> {
        const task = await Task.findOne({ where: payload })
        if (task === null) {
            throw ApiError.BadRequest(`Task with id ${payload.id.toString()} wasn't found`)
        }
        await task.destroy()
        return `Task with id ${payload.id.toString()} was deleted...`
    }
}
