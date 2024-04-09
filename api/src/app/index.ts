import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { Server, createServer } from 'http'
import { Sequelize } from 'sequelize-typescript'
import sequelize from '../db/db'
import routes from '../routes/index'
import errorMiddleware from '../middleware/errors.middleware'

dotenv.config()

export default class App {
    public port: number
    public host: string

    private app: express.Application
    private server: Server
    private sequelize: Sequelize

    constructor(port = 5000, host = 'localhost') {
        this.port = port
        this.host = host
        this.app = this.createApp()
        this.server = this.createServer()
        this.sequelize = sequelize
    }

    private createApp(): express.Application {
        const app = express()
        app.use(cors())
        app.use(express.urlencoded({ extended: true, limit: '1mb' }))
        app.use(express.json())
        app.use(cookieParser())
        app.use('/api/v1', routes)
        app.use(errorMiddleware)
        return app
    }

    private createServer(): Server {
        const server = createServer(this.app)
        return server
    }

    public start(): void {
        this.app.listen(this.port, () => {
            console.log(`Running on port ${this.port}`)
        })
    }
}
