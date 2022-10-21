import { Request, Response } from 'express'
import { Users } from '../../../types/users'
import { User } from '~/config'
import { NotFoundException } from '~/utils/exceptions' //TODO remove

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

export class UsersService {

  async FindOne(id: number) {
    const users = await User.findByPk(id);
    return users
  }

  async CreateUser(user: object) { //TODO minuscule pour les noms de fonction plutôt et pourquoi object ?

    await User.create({ ...user }),
      { fields: ['name', 'firstName', 'email', 'password', 'description'] } //c'est moche, y a rien de mieux ?
  }

  async LoginUser(req: Request, res: Response, user: Partial<Users>) { //req res dan,s le service, on a un souci là, pourquoi ??
    if (await bcrypt.compare(req.body.password, user.password)) {
      const userEmail = req.body.email
      const accessToken = generateAccessToken(userEmail)

      function generateAccessToken(user: object) { //emplacement
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET) //duration
      }

      res.json({ accessToken: accessToken }) //status
    } else {
      res.send('Connexion refusée') //status, et y a encore des gens qui savent écrire connexion en français, ça me fait plaisir
    }
  }

  async UpdateUser(user: object) {
    await User.update({ user }, { where: { email: User.email } })
  }
}