import Role from '../models/Role'
import UserRoles from '../models/UserRoles'
import { addRoleToUserPayload } from '../types'

export default class RoleService {
    async getByName(payload: any): Promise<Role | null> {
        const role = await Role.findOne({ where: { name: payload.name } })
        return role
    }

    async addRoleToUser(payload: addRoleToUserPayload): Promise<any> {
        const [role, __] = await Role.findOrCreate({ where: { role: payload.role } })
        const [newRoleRecord, _] = await UserRoles.findOrCreate({
            where: { userId: payload.userId, roleId: role.id },
        })
    }
}
