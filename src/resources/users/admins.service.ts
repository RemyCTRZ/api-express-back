import { User } from '~/config'
import { NotFoundException } from '~/utils/exceptions'

export class AdminsService {
    async FindAll() {
        const users = await User.findAll();
        return users
    }

    async FindOne(id: number) {
        const users = await User.findByPk(id);
        return users
    }

    async CreateUser(user: object) {
        await User.create({ ...user },
            { fields: ['name', 'surname', 'email', 'password', 'description'] })
    }

    DeleteUser(id: number) {
        return User.destroy({
            id: id, 
        })
    }
}