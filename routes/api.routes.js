import { Router } from 'express'
import ApiController from '../controllers/api.controller.js'

const router = new Router()

router.get('/productos-test', ApiController.products)

export default router