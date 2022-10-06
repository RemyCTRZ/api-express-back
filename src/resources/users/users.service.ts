import { Request, Response } from 'express'
import { Users } from '../../../types/users'
import { User } from '~/config'
import { NotFoundException } from '~/utils/exceptions'

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

export class UsersService {

  async CreateUser(user: object) {
    await User.create({ ...user }),
      { fields: ['name', 'firstName', 'email', 'password', 'description'] }
  }

  async LoginUser(req: Request, res: Response, user: Partial<Users>) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const userEmail = req.body.email
      const accessToken = generateAccessToken(userEmail)

      function generateAccessToken(user: object) {
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
      }

      res.json({ accessToken: accessToken })
    } else {
      res.send('Connexion refusée')
    }
  }

  async UpdateUser(user: object) {
    await User.update({ user }, { where: { email: User.email } })
  }
}