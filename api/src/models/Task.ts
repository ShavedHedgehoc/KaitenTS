import {
    AutoIncrement,
    Column,
    PrimaryKey,
    Table,
    Model,
    AllowNull,
    Default,
    BelongsTo,
    ForeignKey,
    BeforeUpdate,
} from 'sequelize-typescript'

import User from './User'

@Table
class Task extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number

    @ForeignKey(() => User)
    @Column
    userId: number

    @AllowNull(false)
    @Column
    title: string

    @AllowNull(false)
    @Column
    toProcess: number

    @AllowNull(false)
    @Default(0)
    @Column
    processed: number

    @AllowNull(false)
    @Default(false)
    @Column
    completed: boolean

    @BeforeUpdate
    static async closeTask(instance: Task) {
        // const { toProcess, processed, completed } = instance
        if (instance.processed === instance.toProcess) {
            instance.completed = true
        }
    }

    @BelongsTo(() => User)
    user: User
}
export default Task
