import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Survey, SurveyUser, User } from '../models'
import { emailSender } from '../services'

class AdminController {

  //
  async sendEmail(request: Request, response: Response) {
    const { surveyId, userEmail } = request.body
    const survey = await Survey.findOne({ id: surveyId })
    const user = await User.findOne({ email: userEmail })

    if (!user) {
      return response
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ error: 'No valid user email provided.' })
    }

    if (!survey) {
      return response
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ error: 'No valid survey ID provided.' })
    }

    const userSurvey = new SurveyUser()
    userSurvey.surveyId = survey.id
    userSurvey.userId = user.id
    await userSurvey.save()

    await emailSender.submit(user.email, survey.title, survey.description)

    return response
      .status(StatusCodes.CREATED)
      .json(userSurvey)
  }
}

export default AdminController
