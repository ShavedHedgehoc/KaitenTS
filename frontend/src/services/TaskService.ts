import { $api } from '../http'
import { ApiRoutes } from '../consts/apiRoutes'
import { AxiosResponse } from 'axios'
import { TasksResponce } from '../models/responce/TasksResponce'

export default class TasksService {
    static async getTasks(userId: number): Promise<AxiosResponse<TasksResponce>> {
        return $api.get<TasksResponce>(ApiRoutes.GET_TASKS + `/${userId}`)
    }
}
