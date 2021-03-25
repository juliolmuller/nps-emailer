import { Request, Response } from 'express'

class UserController {
  async create(request: Request, response: Response) {
    console.log(request.body)

    response.send()
  }
}

export default UserController
