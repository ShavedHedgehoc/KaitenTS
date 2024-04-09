import {
    AutoIncrement,
    Column,
    PrimaryKey,
    Table,
    Model,
    BeforeCreate,
    BeforeUpdate,
    AllowNull,
    Unique,
    BelongsToMany,
    HasMany,
} from 'sequelize-typescript'
import Role from './Role'
import UserRoles from './UserRoles'
import Token from './Token'
import * as bcrypt from 'bcryptjs'
import Task from './Task'

@Table
class User extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number

    @AllowNull(false)
    @Column
    name: string

    @AllowNull(false)
    @Unique(true)
    @Column
    email: string

    @AllowNull(false)
    @Column
    password: string

    @BeforeCreate
    @BeforeUpdate
    static async generatePasswordHash(instance: User) {
        const { password } = instance
        if (instance.changed('password')) {
            instance.password = await bcrypt.hash(password, 5)
        }
    }

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]

    @HasMany(() => Task)
    tasks: Task[]
}
export default User
