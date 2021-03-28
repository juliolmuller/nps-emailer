import { Router } from 'express'
import { SurveyResponseController } from '../controllers'

const router = Router()
const controller = new SurveyResponseController()

router.post('/send-email', controller.sendEmail)

export default router
