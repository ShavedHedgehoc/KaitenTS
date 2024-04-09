import { Dialect } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
import User from '../models/User'
import Role from '../models/Role'
import Token from '../models/Token'
import UserRoles from '../models/UserRoles'
import Task from '../models/Task'

const dbDialect = (process.env.DB_DRIVER || 'sqlite') as Dialect
const dbStorage = process.env.DB_STORAGE || 'db.dev.sqlite'

const sequelize = new Sequelize({
    dialect: dbDialect,
    storage: dbStorage,
})

const models = [User, Role, UserRoles, Token, Task]

sequelize.addModels(models)

sequelize
    .sync()
    .then(() => console.log('sync models...'))
    .catch((e) => console.log(e))

async function testConnection() {
    try {
        await sequelize.authenticate()
        console.log('Connection succesfully established')
    } catch (error) {
        console.log(error)
    }
}

testConnection()

export default sequelize
