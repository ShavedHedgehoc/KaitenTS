import express from 'express'
import UserController from '../controllers/UserController'
import { dbRoles } from '../consts/consts'
import { authMiddleware } from '../middleware/auth.middleware'
import { roleMiddleware } from '../middleware/role.middleware'

const router: express.Router = express.Router()

const controller: UserController = new UserController()

// router.post('/', controller.post)
router.get('/', [authMiddleware, roleMiddleware([dbRoles.ADMIN, dbRoles.USER])], controller.get)
// router.get('/', [checkJwt, checkRole([dbRoles.ADMIN])], controller.get)
// router.get('/', controller.get)

export default router
