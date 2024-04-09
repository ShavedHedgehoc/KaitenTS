import express from 'express'

import SpaceController from '../controllers/Kaiten/SpaceController'
import BoardController from '../controllers/Kaiten/BoardController'
import CardController from '../controllers/Kaiten/CardController'
import UploadController from '../controllers/Kaiten/UploadController'

const router: express.Router = express.Router()

const controller: SpaceController = new SpaceController()
const bcontroller: BoardController = new BoardController()
const ccontroller: CardController = new CardController()
const uploadController: UploadController = new UploadController()

router.get('/', [], controller.get)
router.post('/boards', [], bcontroller.post)
router.get('/boards', [], bcontroller.get)
router.delete('/boards', [], bcontroller.delete)
router.post('/cards', ccontroller.post)
router.post('/upload', uploadController.post)

export default router
