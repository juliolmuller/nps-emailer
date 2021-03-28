import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { SurveyResponse } from '../models'

class SurveyResponseController {

  // Edit existing survey response, adding user grade
  async respondTo(request: Request, response: Response) {
    // TODO: to implement
    response.json({
      params: request.params,
      query: request.query,
    })
  }
}

export default SurveyResponseController
