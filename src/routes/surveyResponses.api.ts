import { Router } from 'express'
import { SurveyResponseController } from '../controllers'

const router = Router()
const controller = new SurveyResponseController()

router.get('/:id', controller.respondTo)

export default router
