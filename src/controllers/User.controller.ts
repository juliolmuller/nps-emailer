import { Request, Response } from 'express'
import { User } from '../models'

class UserController {

  async create(request: Request, response: Response) {
    const { name, email } = request.body
    const existingUser = await User.findOne({ email })
    console.log(existingUser)
    if (existingUser) {
      return response.status(400).json({
        error: `User with email "${email} already exists.`,
      })
    }

    const user = new User()

    user.name = name
    user.email = email
    await user.save()

    return response.status(201).json(user)
  }
}

export default UserController
