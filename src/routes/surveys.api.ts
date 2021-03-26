import { Router } from 'express'
import { SurveyController } from '../controllers'

const router = Router()
const controller = new SurveyController()

router.get('/', controller.index)
router.post('/', controller.create)

export default router
