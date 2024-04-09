import express from 'express'
import AuthController from '../controllers/Authcontroller'
import { body } from 'express-validator'

const router: express.Router = express.Router()

const controller: AuthController = new AuthController()

router.post('/register', [body('email').isEmail(), body('email', 'empty email').not().isEmpty()], controller.register)
router.post('/login', controller.login)
router.post('/logout', controller.logout)
router.post('/refresh', controller.refresh)

export default router
