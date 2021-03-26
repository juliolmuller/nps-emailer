import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { User } from '../models'

class UserController {

  async create(request: Request, response: Response) {
    const { name, email } = request.body
    const existingUser = await User.findOne({ email })
    console.log(existingUser)
    if (existingUser) {
      return response
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ error: `User with email "${email} already exists.` })
    }

    const user = new User()

    user.name = name
    user.email = email
    await user.save()

    return response
      .status(StatusCodes.CREATED)
      .json(user)
  }
}

export default UserController
