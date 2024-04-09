import ApiError from '../errors'
import Role from '../models/Role'
import User from '../models/User'
import * as mapper from './mapper'

export default class UserService {
    async create(userData: any): Promise<User> {
        const user = await User.create(userData)
        return user
    }

    async getById(id: number): Promise<User | null> {
        const user = await User.findOne({ where: { id: id } })
        return user
    }

    async getByEmail(email: string): Promise<User> {
        const user = await User.findOne({ where: { email: email } })
        if (user === null) {
            throw ApiError.BadRequest('User not found')
        }
        return user
    }

    async getRolesByUserId(id: number): Promise<Array<string>> {
        try {
            const roles = await User.findOne({
                include: { model: Role, as: 'roles' },
                attributes: { exclude: ['id', 'name', 'email', 'password'] },
                where: { id: id },
            })
            if (roles === null) {
                throw new Error()
            }
            return mapper.toRolesList(roles)
        } catch (error: any) {
            throw new Error()
        }
    }

    async getAllUsers(): Promise<User[] | []> {
        const users = await User.findAll()
        return users
    }
}
