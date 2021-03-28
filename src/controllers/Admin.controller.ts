import path from 'path'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Survey, SurveyResponse, User } from '../models'
import { emailSender } from '../services'

class AdminController {

  // Creates an unanswered survey response and notify user
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
      user: user.name,
      title: survey.title,
      description: survey.description,
      surveyId: surveyResponse.id,
      responseURI: `${process.env.HOST}:${process.env.PORT}/survey-response`,
    })

    return response
      .status(StatusCodes.CREATED)
      .json(surveyResponse)
  }

  /**
   * Calculate and return NPS index
   *
   * Detractors: between 0 and 6
   * Passives:   between 7 and 8
   * Promoters:  between 9 and 10
   *
   * NPS = (promoters - detractors) / total * 100
   */
  async calculateNPS(request: Request, response: Response) {
    const { surveyId } = request.params
    const surveyResponses = await SurveyResponse.find({ surveyId })

    const DETRACTION_MAX_SCORE = 6
    const PROMOTION_MIN_SCORE = 9
    const totalResponses = surveyResponses.length
    const [unanswered, detractors, promoters] = await Promise.all([
      surveyResponses.filter(({ value }) => value === null).length,
      surveyResponses.filter(({ value }) => value !== null && value <= DETRACTION_MAX_SCORE).length,
      surveyResponses.filter(({ value }) => value !== null && value >= PROMOTION_MIN_SCORE).length,
    ])

    const passives = totalResponses - unanswered - detractors - promoters
    const nps = totalResponses > unanswered
      ? (promoters - detractors) / (totalResponses - unanswered)
      : null

    return response
      .status(StatusCodes.OK)
      .json({
        detractors,
        passives,
        promoters,
        unanswered,
        total: totalResponses,
        nps: nps && `${Math.round(nps * 100)}%`,
      })
  }
}

export default AdminController
