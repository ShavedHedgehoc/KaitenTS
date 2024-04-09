import express from 'express'
import userRoutes from './user.routes'
import authRoutes from './auth.routes'
import kaitenRoutes from './kaiten.routes'
import taskRoutes from './task.routes'

const router: express.Router = express.Router()

router.use('/users', userRoutes)
router.use('/auth', authRoutes)
router.use('/kaiten', kaitenRoutes)
router.use('/tasks', taskRoutes)

export default router
