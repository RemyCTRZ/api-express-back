import { User } from '~/config'
import { NotFoundException } from '~/utils/exceptions'

export class UsersService {

  async FindAll() {
    const users = await User.findAll();
    return
  }

  async FindOne(id: number) {
    const users = await User.findByPk(id);
    return
  }

  async CreateUser(name: string, surname: string, email: string, password: string, description: string) {

    await User.sync({ alter: true }).then(() => {
      return User.create({
        name: name,
        surname: surname,
        email: email,
        password: password,
        description: description
      })
    }).then(() => {
      console.log("Utilisateur ajouté à la base de données !")
    }).catch((err: string) => {
      console.log(err)
    })

  }

  DeleteUser(id: number) {
    return User.destroy({
      id: id,
    })

  }



}