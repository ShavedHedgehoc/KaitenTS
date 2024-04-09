import express from 'express'
import TaskController from '../controllers/TaskController'

import { authMiddleware } from '../middleware/auth.middleware'
import { roleMiddleware } from '../middleware/role.middleware'
import { dbRoles } from '../consts/consts'

const router: express.Router = express.Router()

const controller: TaskController = new TaskController()

router.get('/:userId', controller.get)
router.post('/', controller.post)
// router.get('/', [authMiddleware, roleMiddleware([dbRoles.ADMIN, dbRoles.SPECIALIST])], controller.get)
router.put('/', controller.put)
router.delete('/', controller.delete)
// router.get('/', controller.get)

export default router
