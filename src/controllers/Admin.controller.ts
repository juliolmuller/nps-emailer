import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Survey, SurveyUser, User } from '../models'

class AdminController {

  //
  async sendEmail(request: Request, response: Response) {
    const { surveyId, userEmail } = request.body
    const existingSurvey = await Survey.findOne({ id: surveyId })
    const existingUser = await User.findOne({ email: userEmail })

    if (!existingUser) {
      return response
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ error: 'No valid user email provided.' })
    }

    if (!existingSurvey) {
      return response
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ error: 'No valid survey ID provided.' })
    }

    const userSurvey = new SurveyUser()

    userSurvey.surveyId = existingSurvey.id
    userSurvey.userId = existingUser.id
    await userSurvey.save()

    return response
      .status(StatusCodes.CREATED)
      .json(userSurvey)
  }
}

export default AdminController
