import { Router } from 'express'
import { UsersService } from '~/resources/users/users.service'
import { BadRequestException, NotFoundException } from '~/utils/exceptions'
import { User } from '~/config'
import { authenticateToken } from '~/middlewares/authenticateToken'


require('dotenv').config()
const bcrypt = require('bcrypt')
const UsersController = Router()


// Route pour la page de profil de l'utilisateur connecté

UsersController.get('/profile', authenticateToken, async (req, res) => {
    return res.status(200).json(await User.findOne({ where: { email: User.email } }))
})

// Route pour l'inscription

UsersController.post('/signup', async (req, res) => {
    try {

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const user: object = {
            name: req.body.name,
            firstName: req.body.firstName,
            birthDate: req.body.birthDate,
            email: req.body.email,
            password: hashedPassword,
            description: req.body.description
        }

        return res.status(200).json(await service.CreateUser(user))

    } catch {
        res.status(500).send("Informations invalides")
    }
})

// Route pour que l'utilisateur se connecte (vérification mdp et token)

UsersController.post('/login', async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.email } })
    if (user == null) {
        return res.status(400).send('Utilisateur introuvable')
    }
    try {
        return res.status(200).json(await service.LoginUser(req, res, user))
    } catch {
        res.status(500).send('Opération échouée')
    }
})

// Route pour la modification des données de l'utilisateur

UsersController.post('/update', authenticateToken, async (req, res) => {

    const user = {
        email: req.body.email,
    }

    try {
        return res.status(200).json(service.UpdateUser(user))
    } catch {
        res.status(500).send('Erreur update')
    }
})

/**
 * Instance de notre service
 */
const service = new UsersService()


/**
 * On exporte notre controller pour l'utiliser dans `src/index.ts`
 */
export { UsersController }