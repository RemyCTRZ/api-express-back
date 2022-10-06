import { Router } from 'express'
import { UsersService } from '~/resources/users/users.service'
import { BadRequestException, NotFoundException } from '~/utils/exceptions'
import { User } from '~/config'

require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UsersController = Router()



// Route pour la page de profil de l'utilisateur connecté

UsersController.get('/profile', async (req, res) => {
    res.json(await User.findOne({ where: { email: User.email } }))
})

// Route pour l'inscription

UsersController.post('/signup', async (req, res) => {
    try {

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const user = {
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: hashedPassword,
            description: req.body.description
        }

        service.CreateUser(user)

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
        service.LoginUser(req, res, user);
    } catch {
        res.status(500).send('Opération échouée')
    }
})

// Route pour la modification des données de l'utilisateur

UsersController.post('/update', async (req, res) => {

    const user = {
        email: req.body.email,
    }
    
    try {
        service.UpdateUser(user)
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