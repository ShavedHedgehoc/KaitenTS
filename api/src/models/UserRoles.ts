import { Column, Table, Model, ForeignKey } from 'sequelize-typescript'
import User from './User'
import Role from './Role'

@Table
class UserRoles extends Model {
    @ForeignKey(() => User)
    @Column
    userId: number

    @ForeignKey(() => Role)
    @Column
    roleId: number
}
export default UserRoles
