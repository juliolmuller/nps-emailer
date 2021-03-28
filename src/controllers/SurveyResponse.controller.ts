import path from 'path'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Survey, SurveyResponse, User } from '../models'
import { emailSender } from '../services'

class SurveyResponseController {

  //
  async sendEmail(request: Request, response: Response) {
    const { surveyId, userEmail } = request.body
    const survey = await Survey.findOne({ id: surveyId })
    const user = await User.findOne({ email: userEmail })
    const existingResponse = await SurveyResponse.findOne({
      surveyId: survey?.id,
      userId: user?.id,
    })

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

    if (existingResponse) {
      return response
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ error: `Survey has already been assigned to user "${user.email}".` })
    }

    const surveyResponse = new SurveyResponse()
    surveyResponse.surveyId = survey.id
    surveyResponse.userId = user.id
    await surveyResponse.save()

    const templatePath = path.resolve(__dirname, '..', 'templates', 'emails', 'survey.hbs')
    await emailSender.submit(user.email, survey.title, templatePath, {
      username: user.name,
      title: survey.title,
      description: survey.description,
    })

    return response
      .status(StatusCodes.CREATED)
      .json(surveyResponse)
  }
}

export default SurveyResponseController
