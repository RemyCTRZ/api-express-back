import { Router } from 'express'
import { UsersService } from '~/resources/users/users.service'
import { BadRequestException, NotFoundException } from '~/utils/exceptions'
import { User } from '~/config'

require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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

UsersController.get('/profile', async (req, res) => {
    res.json(await User.findOne({ where: { email: User.email } }))
})

UsersController.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const user = {
            name: req.body.name,
            firstName: req.body.firstName,
            email: req.body.email,
            password: hashedPassword,
            description: req.body.description
        }

        service.CreateUser(user)

    } catch {
        res.status(500).send()
    }
})

UsersController.post('/login', async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.email } })
    if (user == null) {
        return res.status(400).send('Utilisateur introuvable')
    }
    try {
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
    } catch {
        res.status(500).send('Opération échouée')
    }
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