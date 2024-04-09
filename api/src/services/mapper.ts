import Role from '../models/Role'
import Task from '../models/Task'
import User from '../models/User'
import { RegisteredUserData, Tokens } from '../types'

export const toRegisteredUserData = (user: User, tokens: Tokens, roles: string[]): RegisteredUserData => {
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            roles: roles,
        },
        token: tokens.accessToken,
    }
}

export const toRolesList = (user: User): string[] => {
    const roles: string[] = []
    user.roles.map((item: Role) => {
        roles.push(item.role)
    })
    return roles
}

// Tasks

export const toTasksList = (tasks: Task[]) => {
    return { tasks: tasks }
}
