import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { SurveyResponse } from '../models'

class SurveyResponseController {

  // Edit existing survey response, adding user grade
  async respondTo(request: Request, response: Response) {
    const { id } = request.params
    const { grade } = request.query
    const surveyResponse = await SurveyResponse.findOne({ id: String(id) })

    if (!surveyResponse) {
      return response
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ error: 'Survey response could not be processed.' })
    }

    surveyResponse.value = Number(grade)
    await surveyResponse.save()

    return response
      .status(StatusCodes.OK)
      .json({ message: 'Survey response successfully processed.' })
  }
}

export default SurveyResponseController
