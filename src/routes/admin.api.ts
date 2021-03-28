import { Router } from 'express'
import { AdminController } from '../controllers'

const router = Router()
const controller = new AdminController()

router.post('/send-email', controller.sendEmail)
router.get('/nps/:surveyId', controller.calculateNPS)

export default router
