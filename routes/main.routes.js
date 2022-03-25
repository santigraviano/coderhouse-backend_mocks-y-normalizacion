import { Router } from 'express'
import MainController from '../controllers/main.controller.js'

const router = new Router()

router.get('/', MainController.index)
router.get('/productos', MainController.show)

export default router