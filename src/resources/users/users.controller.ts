import { Router } from 'express'
import { stringify } from 'querystring'
import { REPL_MODE_STRICT } from 'repl'
import { UsersService } from '~/resources/users/users.service'
import { BadRequestException, NotFoundException } from '~/utils/exceptions'

/**
 * Nous créeons un `Router` Express, il nous permet de créer des routes en dehors du fichier `src/index.ts`
 */
const UsersController = Router()

UsersController.get('/', async (req, res) => {
    return res
        .status(200)
        .json(await service.FindAll())
})

UsersController.get('/:id', async (req, res) => {
    const id: number = Number(req.params.id)
    return res
        .status(200)
        .json(await service.FindOne(id))
})

UsersController.post('/sign-in', (req, res) => {

    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;
    const password = req.body.password;
    const description = req.body.description;

    return res
        .status(200)
        .json(service.CreateUser(name, surname, email, password, description))
})

UsersController.post('/delete', (req, res) => {

    const id = req.body.id

    return res
        .status(200)
        .json(service.DeleteUser(id))

})

/**
 * Instance de notre service
 */
const service = new UsersService()


/**
 * On exporte notre controller pour l'utiliser dans `src/index.ts`
 */
export { UsersController }