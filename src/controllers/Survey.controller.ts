import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Survey } from '../models'

class SurveyController {

  // List all surveys stored as JSON
  async index(_request: Request, response: Response) {
    const surveys = await Survey.find()

    return response
      .status(StatusCodes.OK)
      .json(surveys)
  }

  // Extract data required from request to save a new survey
  async create(request: Request, response: Response) {
    const { title, description } = request.body
    const survey = new Survey()

    survey.title = title
    survey.description = description
    await survey.save()

    return response
      .status(StatusCodes.CREATED)
      .json(survey)
  }
}

export default SurveyController
